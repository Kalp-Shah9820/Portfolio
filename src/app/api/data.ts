// Blog data types and interfaces
export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  excerpt: string;
  featuredImage?: string;
  imageQuery?: string; // Query used to generate the image
  imageData?: {
    id: string;
    url: string;
    small: string;
    thumb: string;
    alt: string;
    author: string;
    authorUrl: string;
  };
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  author: string;
  tags: string[];
  excerpt: string;
  featuredImage?: string;
  imageQuery?: string;
}

export interface UpdateBlogRequest {
  title?: string;
  content?: string;
  author?: string;
  tags?: string[];
  excerpt?: string;
  featuredImage?: string;
  imageQuery?: string;
}

// Mock data for development
export const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    content: "Next.js is a powerful React framework that enables you to build full-stack web applications with ease. In this comprehensive guide, we'll explore the core features and benefits of Next.js, including server-side rendering, static site generation, and API routes.\n\n## Key Features\n\n- **Server-Side Rendering (SSR)**: Improves SEO and initial page load performance\n- **Static Site Generation (SSG)**: Pre-renders pages at build time for optimal performance\n- **API Routes**: Build backend functionality directly in your Next.js application\n- **File-based Routing**: Intuitive routing system based on your file structure\n- **Built-in CSS Support**: Seamless integration with CSS modules, Sass, and Tailwind CSS\n\n## Getting Started\n\nTo create a new Next.js project, run:\n\n```bash\nnpx create-next-app@latest my-app\ncd my-app\nnpm run dev\n```\n\nThis will create a new Next.js application with all the necessary dependencies and configuration.",
    author: "John Doe",
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    tags: ["Next.js", "React", "JavaScript", "Web Development"],
    excerpt: "Learn how to get started with Next.js, the powerful React framework for building modern web applications.",
    imageQuery: "nextjs react web development"
  },
  {
    id: "2",
    title: "Mastering TypeScript in React",
    content: "TypeScript brings type safety to your React applications, helping you catch errors early and write more maintainable code. In this article, we'll dive deep into TypeScript best practices for React development.\n\n## Why TypeScript?\n\nTypeScript offers several advantages:\n\n- **Type Safety**: Catch errors at compile time\n- **Better IDE Support**: Enhanced autocomplete and refactoring\n- **Improved Documentation**: Types serve as inline documentation\n- **Easier Refactoring**: Confident code changes with type checking\n\n## Setting Up TypeScript with React\n\n```bash\nnpm install --save-dev typescript @types/react @types/react-dom\n```\n\nCreate a `tsconfig.json` file:\n\n```json\n{\n  \"compilerOptions\": {\n    \"target\": \"es5\",\n    \"lib\": [\"dom\", \"dom.iterable\", \"es6\"],\n    \"allowJs\": true,\n    \"skipLibCheck\": true,\n    \"esModuleInterop\": true,\n    \"allowSyntheticDefaultImports\": true,\n    \"strict\": true,\n    \"forceConsistentCasingInFileNames\": true,\n    \"module\": \"esnext\",\n    \"moduleResolution\": \"node\",\n    \"resolveJsonModule\": true,\n    \"isolatedModules\": true,\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\"\n  },\n  \"include\": [\"next-env.d.ts\", \"**/*.ts\", \"**/*.tsx\", \".next/types/**/*.ts\"]\n}\n```",
    author: "Jane Smith",
    publishedAt: "2024-01-20T14:30:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    tags: ["TypeScript", "React", "JavaScript", "Development"],
    excerpt: "Discover how to leverage TypeScript in your React applications for better type safety and developer experience.",
    imageQuery: "typescript react programming"
  },
  {
    id: "3",
    title: "Building RESTful APIs with Next.js",
    content: "Next.js API routes provide a powerful way to build backend functionality directly in your Next.js application. In this tutorial, we'll explore how to create RESTful APIs with proper HTTP methods and error handling.\n\n## API Routes Overview\n\nAPI routes in Next.js are serverless functions that handle HTTP requests. They're perfect for:\n\n- Building RESTful APIs\n- Handling form submissions\n- Creating webhooks\n- Processing payments\n- Database operations\n\n## Creating API Routes\n\nAPI routes are created in the `pages/api` or `app/api` directory. Each file represents an API endpoint.\n\n### Basic GET Route\n\n```typescript\n// app/api/users/route.ts\nexport async function GET() {\n  return Response.json({ users: [] });\n}\n```\n\n### Handling Different HTTP Methods\n\n```typescript\n// app/api/users/route.ts\nexport async function GET() {\n  // Handle GET request\n  return Response.json({ users: [] });\n}\n\nexport async function POST(request: Request) {\n  // Handle POST request\n  const body = await request.json();\n  return Response.json({ message: 'User created', user: body });\n}\n```\n\n## Best Practices\n\n- Always validate input data\n- Implement proper error handling\n- Use appropriate HTTP status codes\n- Add authentication and authorization\n- Implement rate limiting for public APIs",
    author: "Mike Johnson",
    publishedAt: "2024-01-25T09:15:00Z",
    updatedAt: "2024-01-25T09:15:00Z",
    tags: ["Next.js", "API", "Backend", "REST", "Web Development"],
    excerpt: "Learn how to build robust RESTful APIs using Next.js API routes with proper HTTP methods and error handling.",
    imageQuery: "api backend programming"
  }
];

// Utility functions for data manipulation
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toISOString();
}

export function createBlog(data: CreateBlogRequest): Blog {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title: data.title,
    content: data.content,
    author: data.author,
    publishedAt: now,
    updatedAt: now,
    tags: data.tags || [],
    excerpt: data.excerpt,
    featuredImage: data.featuredImage
  };
}

export function updateBlog(existingBlog: Blog, data: UpdateBlogRequest): Blog {
  return {
    ...existingBlog,
    ...data,
    updatedAt: new Date().toISOString()
  };
}

// Generate image query from blog content
export function generateImageQuery(title: string, tags: string[]): string {
  // Use title as primary query
  let query = title.toLowerCase();
  
  // Clean up the query - remove common words and special characters
  query = query
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by|from|up|about|into|through|during|before|after|above|below|between|among|under|over|inside|outside|within|without|upon|against|toward|towards|near|far|here|there|where|when|why|how|what|which|who|whom|whose|this|that|these|those|i|you|he|she|it|we|they|me|him|her|us|them|my|your|his|her|its|our|their|mine|yours|hers|ours|theirs|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|could|should|may|might|must|can|shall)\b/g, '') // Remove common words
    .trim();
  
  // If query is too short or empty, use first tag or fallback
  if (query.length < 3) {
    if (tags.length > 0) {
      query = tags[0].toLowerCase();
    } else {
      query = 'technology programming';
    }
  }
  
  // Limit query length
  if (query.length > 50) {
    query = query.substring(0, 50);
  }
  
  return query;
}

// Fetch Unsplash image data
export async function fetchUnsplashImage(query: string) {
  try {
    const response = await fetch(`/api/unsplash?query=${encodeURIComponent(query)}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return null;
  }
}
