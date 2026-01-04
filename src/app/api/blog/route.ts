import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { generateImageQuery } from '../data';

// Fetch Unsplash image for a given query (similar to projects page)
async function getBlogImage(query: string) {
  const unsplashApiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  if (!unsplashApiKey) {
    console.warn('Unsplash API key not configured, skipping image generation');
    return null;
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${unsplashApiKey}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Failed to fetch image for:", query);
      return null;
    }
    
    const imageData = await res.json();
    return {
      id: imageData.id,
      url: imageData.urls.regular,
      small: imageData.urls.small,
      thumb: imageData.urls.thumb,
      alt: imageData.alt_description || query,
      author: imageData.user.name,
      authorUrl: imageData.user.links.html,
      downloadLocation: imageData.links.download_location
    };
  } catch (error) {
    console.error("Error fetching image for:", query, error);
    return null;
  }
}

// GET /api/blog - Fetch all blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag') || '';

    // Build where clause for filtering
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (tag) {
      where.tags = { contains: tag, mode: 'insensitive' };
    }

    // Get total count for pagination
    const total = await prisma.blogPage.count({ where });

    // Fetch blogs with pagination
    const blogs = await prisma.blogPage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      filters: {
        search,
        tag
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Validate title length
    if (body.title.length < 3 || body.title.length > 200) {
      return NextResponse.json(
        { error: 'Title must be between 3 and 200 characters' },
        { status: 400 }
      );
    }

    // Validate content length
    if (body.content.length < 10) {
      return NextResponse.json(
        { error: 'Content must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Generate image query from title and tags
    const imageQuery = generateImageQuery(body.title, body.tags);
    
    // Fetch image from Unsplash
    const imageData = await getBlogImage(imageQuery);
    
    // Create new blog in database
    const newBlog = await prisma.blogPage.create({
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt || body.content.substring(0, 150) + '...',
        slug: slug,
        published: body.published || false,
        author: body.author || 'Anonymous',
        tags: body.tags ? (Array.isArray(body.tags) ? body.tags.join(', ') : body.tags) : '',
        readTime: body.readTime || Math.ceil(body.content.split(' ').length / 200),
        views: 0
      }
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}