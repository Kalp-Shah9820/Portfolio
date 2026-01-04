import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create sample blog pages
  const blogPages = [
    {
      title: 'Getting Started with Next.js',
      content: `# Getting Started with Next.js

Next.js is a React framework that provides a great developer experience with features like:

- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes
- Built-in CSS support
- Automatic code splitting

## Why Next.js?

Next.js makes it easy to build fast, SEO-friendly web applications. It's built on top of React and provides additional features that make development more efficient.

## Getting Started

To create a new Next.js project, run:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will create a new Next.js application with all the necessary dependencies and configuration.`,
      excerpt: 'Learn the basics of Next.js and how to get started with this powerful React framework.',
      slug: 'getting-started-with-nextjs',
      published: true,
      author: 'John Doe',
      tags: 'Next.js,React,JavaScript,Web Development',
      readTime: 5,
    },
    {
      title: 'Understanding TypeScript in React',
      content: `# Understanding TypeScript in React

TypeScript brings static type checking to JavaScript, making your code more robust and maintainable.

## Benefits of TypeScript

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as documentation
- **Easier Refactoring**: Confident code changes

## Setting Up TypeScript with React

1. Install TypeScript dependencies
2. Configure tsconfig.json
3. Add type definitions
4. Start writing typed components

## Example Component

\`\`\`typescript
interface Props {
  title: string;
  count: number;
}

const Counter: React.FC<Props> = ({ title, count }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
    </div>
  );
};
\`\`\``,
      excerpt: 'Learn how to use TypeScript effectively in React applications for better type safety and developer experience.',
      slug: 'understanding-typescript-in-react',
      published: true,
      author: 'Jane Smith',
      tags: 'TypeScript,React,JavaScript,Programming',
      readTime: 8,
    },
    {
      title: 'Building a Blog with Prisma',
      content: `# Building a Blog with Prisma

Prisma is a modern database toolkit that makes database access easy and type-safe.

## What is Prisma?

Prisma is a next-generation ORM that provides:
- Type-safe database access
- Auto-generated query builder
- Database migrations
- Real-time database introspection

## Setting Up Prisma

1. Install Prisma CLI
2. Initialize Prisma
3. Define your schema
4. Generate the client
5. Run migrations

## Example Schema

\`\`\`prisma
model BlogPost {
  id        String   @id @default(cuid())
  title     String
  content   String
  published Boolean  @default(false)
  createdAt DateTime @default(now())
}
\`\`\``,
      excerpt: 'A comprehensive guide to building a blog application using Prisma as your database toolkit.',
      slug: 'building-a-blog-with-prisma',
      published: true,
      author: 'Mike Johnson',
      tags: 'Prisma,Database,ORM,Backend',
      readTime: 12,
    },
    {
      title: 'Draft: Advanced React Patterns',
      content: `# Advanced React Patterns

This is a draft article about advanced React patterns including:

- Higher-Order Components (HOCs)
- Render Props
- Custom Hooks
- Context API
- Compound Components

*This article is still in draft and not yet published.*`,
      excerpt: 'Exploring advanced patterns in React development (Draft)',
      slug: 'advanced-react-patterns',
      published: false,
      author: 'Sarah Wilson',
      tags: 'React,Advanced,Patterns,JavaScript',
      readTime: 15,
    },
  ]

  // Clear existing data
  await prisma.blogPage.deleteMany()

  // Create blog pages
  for (const blogPage of blogPages) {
    await prisma.blogPage.create({
      data: blogPage,
    })
  }

  console.log('✅ Seed completed successfully!')
  console.log(`📝 Created ${blogPages.length} blog pages`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
