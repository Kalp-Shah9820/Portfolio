# Blog API Documentation

This document describes the RESTful API endpoints for the blog management system.

## Base URL
All API endpoints are prefixed with `/api/blog`

## Endpoints

### 1. GET /api/blog
Fetch all blogs with optional filtering and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of blogs per pnpmage (default: 10)
- `search` (optional): Search term for title, content, or excerpt
- `tag` (optional): Filter by tag

**Example Request:**
```
GET /api/blog?page=1&limit=5&search=nextjs&tag=React
```

**Response:**
```json
{
  "blogs": [
    {
      "id": "1",
      "title": "Getting Started with Next.js",
      "content": "Next.js is a powerful React framework...",
      "author": "John Doe",
      "publishedAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "tags": ["Next.js", "React", "JavaScript"],
      "excerpt": "Learn how to get started with Next.js...",
      "featuredImage": "/images/nextjs-banner.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 3,
    "totalPages": 1
  },
  "filters": {
    "search": "nextjs",
    "tag": "React"
  }
}
```

### 2. POST /api/blog
Create a new blog post.

**Request Body:**
```json
{
  "title": "My New Blog Post",
  "content": "This is the content of my blog post...",
  "author": "Jane Smith",
  "excerpt": "A brief description of the blog post",
  "tags": ["JavaScript", "Web Development"],
  "featuredImage": "https://example.com/image.jpg"
}
```

**Required Fields:**
- `title` (string, 3-200 characters)
- `content` (string, minimum 10 characters)
- `author` (string)

**Optional Fields:**
- `excerpt` (string)
- `tags` (array of strings)
- `featuredImage` (string, URL)

**Response:**
```json
{
  "id": "4",
  "title": "My New Blog Post",
  "content": "This is the content of my blog post...",
  "author": "Jane Smith",
  "publishedAt": "2024-01-30T12:00:00Z",
  "updatedAt": "2024-01-30T12:00:00Z",
  "tags": ["JavaScript", "Web Development"],
  "excerpt": "A brief description of the blog post",
  "featuredImage": "https://example.com/image.jpg"
}
```

### 3. GET /api/blog/[blogId]
Fetch a single blog post by ID.

**Example Request:**
```
GET /api/blog/1
```

**Response:**
```json
{
  "id": "1",
  "title": "Getting Started with Next.js",
  "content": "Next.js is a powerful React framework...",
  "author": "John Doe",
  "publishedAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z",
  "tags": ["Next.js", "React", "JavaScript"],
  "excerpt": "Learn how to get started with Next.js...",
  "featuredImage": "/images/nextjs-banner.jpg"
}
```

### 4. PUT /api/blog/[blogId]
Update an existing blog post.

**Request Body:**
```json
{
  "title": "Updated Blog Title",
  "content": "Updated content...",
  "author": "Jane Smith",
  "excerpt": "Updated excerpt",
  "tags": ["Updated", "Tags"],
  "featuredImage": "https://example.com/new-image.jpg"
}
```

**Note:** All fields are optional. Only provided fields will be updated.

**Response:**
```json
{
  "id": "1",
  "title": "Updated Blog Title",
  "content": "Updated content...",
  "author": "Jane Smith",
  "publishedAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-30T12:00:00Z",
  "tags": ["Updated", "Tags"],
  "excerpt": "Updated excerpt",
  "featuredImage": "https://example.com/new-image.jpg"
}
```

### 5. DELETE /api/blog/[blogId]
Delete a blog post.

**Example Request:**
```
DELETE /api/blog/1
```

**Response:**
```json
{
  "message": "Blog deleted successfully",
  "blog": {
    "id": "1",
    "title": "Getting Started with Next.js",
    "content": "Next.js is a powerful React framework...",
    "author": "John Doe",
    "publishedAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "tags": ["Next.js", "React", "JavaScript"],
    "excerpt": "Learn how to get started with Next.js...",
    "featuredImage": "/images/nextjs-banner.jpg"
  }
}
```

## Error Responses

All endpoints return appropriate HTTP status codes and error messages:

### 400 Bad Request
```json
{
  "error": "Title, content, and author are required"
}
```

### 404 Not Found
```json
{
  "error": "Blog not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch blogs"
}
```

## Frontend Pages

### Blog Listing Page (`/blog`)
- Displays all blogs with pagination and filtering
- Search functionality by title, content, or excerpt
- Filter by tags
- Create new blog posts
- Edit existing blog posts inline
- Delete blog posts with confirmation

### Individual Blog Page (`/blog/[blogId]`)
- Displays full blog content
- Edit functionality
- Delete functionality
- Navigation back to blog listing

## Features

- **Full CRUD Operations**: Create, Read, Update, Delete
- **Search and Filtering**: Search by content, filter by tags
- **Pagination**: Handle large numbers of blog posts
- **Form Validation**: Client and server-side validation
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Changes reflect immediately in the UI
- **Error Handling**: Proper error messages and user feedback

## Data Storage

Currently using in-memory storage for demonstration purposes. In a production environment, you would integrate with a database like:
- PostgreSQL
- MongoDB
- SQLite
- Firebase Firestore

## Getting Started

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `/blog` to see the blog management interface

3. Use the API endpoints directly or through the frontend interface

## Testing the API

You can test the API endpoints using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)
- Browser dev tools

Example curl commands:

```bash
# Get all blogs
curl http://localhost:3000/api/blog

# Create a new blog
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Blog","content":"This is test content","author":"Test Author","excerpt":"Test excerpt"}'

# Get a specific blog
curl http://localhost:3000/api/blog/1

# Update a blog
curl -X PUT http://localhost:3000/api/blog/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete a blog
curl -X DELETE http://localhost:3000/api/blog/1
```
