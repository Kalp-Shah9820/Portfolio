import Link from "next/link";
import Image from "next/image";
import type { Blog } from "../api/data";

// Fetch Unsplash image for a given query
async function getBlogImage(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  // Always return placeholder if no API key or if it's the default placeholder
  if (!apiKey || apiKey === 'your_unsplash_api_key_here') {
    console.warn("Unsplash API key not configured. Using placeholder images.");
    return {
      urls: {
        small: `https://via.placeholder.com/400x250/6366f1/ffffff?text=${encodeURIComponent(query)}`,
        regular: `https://via.placeholder.com/800x500/6366f1/ffffff?text=${encodeURIComponent(query)}`
      },
      alt_description: query
    };
  }

  try {
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${apiKey}`,
      { 
        cache: "no-store",
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Unsplash API returned ${res.status} for query: "${query}". Using placeholder.`);
      return {
        urls: {
          small: `https://via.placeholder.com/400x250/6366f1/ffffff?text=${encodeURIComponent(query)}`,
          regular: `https://via.placeholder.com/800x500/6366f1/ffffff?text=${encodeURIComponent(query)}`
        },
        alt_description: query
      };
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`Error fetching image for "${query}":`, error);
    return {
      urls: {
        small: `https://via.placeholder.com/400x250/6366f1/ffffff?text=${encodeURIComponent(query)}`,
        regular: `https://via.placeholder.com/800x500/6366f1/ffffff?text=${encodeURIComponent(query)}`
      },
      alt_description: query
    };
  }
}

export default async function Blog() {
  let blogs: any[] = [];

  try {
    // Fetch blogs from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    
    const data = await response.json();
    blogs = data.blogs || [];
  } catch (error) {
    console.error("Error loading blogs:", error);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h1>
          <p className="text-gray-400">Failed to load blog posts.</p>
        </div>
      </div>
    );
  }

  // Generate placeholder images for each blog using a more reliable service
  const images = blogs.map((blog, index) => {
    const query = blog.title.toLowerCase();
    // Use picsum.photos for reliable placeholder images
    const imageId = (index % 20) + 1; // Cycle through 20 different images
    return {
      urls: {
        small: `https://picsum.photos/400/250?random=${imageId}`,
        regular: `https://picsum.photos/800/500?random=${imageId}`
      },
      alt_description: query
    };
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white px-8 py-16 space-y-12">
      {/* Header */}
      <section className="text-center space-y-6">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          📝 My Blog
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Explore my latest thoughts and insights on{" "}
          <span className="text-indigo-400 font-semibold">Web Development</span>{" "}
          and{" "}
          <span className="text-pink-400 font-semibold">Technology</span>.
        </p>
      </section>

      {/* Blog Cards Grid */}
      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group block rounded-2xl bg-gradient-to-br from-indigo-700/40 to-slate-800/40 shadow-lg hover:scale-105 hover:shadow-2xl hover:from-pink-600/40 hover:to-purple-700/40 transition"
            >
              {/* Blog Image */}
              {images[index] && (
                <div className="overflow-hidden rounded-t-2xl">
                  <Image
                    src={images[index].urls.small}
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="object-cover w-full h-48 group-hover:scale-110 transition duration-500"
                  />
                </div>
              )}

              {/* Blog Info */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white group-hover:text-pink-300">
                  {blog.title}
                </h3>
                <p className="text-slate-300 mt-3">{blog.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags && blog.tags.split(',').map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 group-hover:bg-pink-500/20 group-hover:text-pink-300"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">No blog posts found</h2>
          <p className="text-gray-400">Check back later for new content!</p>
        </div>
      )}
    </main>
  );
}
