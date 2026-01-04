import Link from "next/link";
import Image from "next/image";

interface BlogPostProps {
  params: Promise<{
    blogID: string;
  }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { blogID } = await params;

  // Validate blogID
  if (!blogID || typeof blogID !== 'string') {
    console.error('Invalid blogID:', blogID);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Invalid Blog ID</h1>
          <p className="text-gray-400 mb-6">
            The blog ID provided is invalid or missing.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  try {
    // ✅ Fetch blog by ID
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog/${blogID}`;
    
    const response = await fetch(apiUrl, { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Blog not found");
      }
      throw new Error(`Failed to fetch blog: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // ✅ Handle all possible shapes (object, array, wrapped object)
    const blog = Array.isArray(data)
      ? data[0]
      : data.blog || data.blogs?.[0] || data;

    if (!blog) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-100 mb-4">Blog post not found</h1>
            <p className="text-gray-400 mb-6">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Blogs
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blogs
            </Link>
          </div>

          {/* Blog Content */}
          <article className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Featured Image */}
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={`https://picsum.photos/800/500?random=${blog.id?.slice(-2) || 1}`}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              {/* Header */}
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-100 mb-4 leading-tight">
                  {blog.title}
                </h1>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                  <span>By {blog.author || "Anonymous"}</span>
                  <span>•</span>
                  <span>
                    Published{" "}
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                  {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                    <>
                      <span>•</span>
                      <span>
                        Updated {new Date(blog.updatedAt).toLocaleDateString()}
                      </span>
                    </>
                  )}
                  <span>•</span>
                  <span>{blog.readTime || 1} min read</span>
                </div>

                {/* Tags */}
                {blog.tags && (
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.split(",").map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {blog.content}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-400 mb-6">Failed to load the blog post.</p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }
}
