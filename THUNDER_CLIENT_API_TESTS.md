# Thunder Client API Tests for Blog Pages

This document provides comprehensive API endpoints for testing the blog pages CRUD operations using Thunder Client.

## Base URL
```
http://localhost:3000
```

## 1. GET All Blog Pages

### Endpoint
```
GET /api/blog
```

### Query Parameters
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term
- `tag` (optional): Filter by tag
- `published` (optional): Filter by published status (default: true)

### Example Requests
```
GET /api/blog
GET /api/blog?page=1&limit=5
GET /api/blog?search=nextjs
GET /api/blog?tag=React
GET /api/blog?published=false
```

### Expected Response
```json
{
  "blogPages": [
    {
      "id": "cuid123...",
      "title": "Getting Started with Next.js",
      "content": "# Getting Started with Next.js...",
      "excerpt": "Learn the basics of Next.js...",
      "slug": "getting-started-with-nextjs",
      "published": true,
      "createdAt": "2025-01-23T07:10:12.000Z",
      "updatedAt": "2025-01-23T07:10:12.000Z",
      "author": "John Doe",
      "tags": "Next.js,React,JavaScript,Web Development",
      "readTime": 5,
      "views": 0
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 4,
    "totalPages": 1
  },
  "filters": {
    "search": "",
    "tag": "",
    "published": "true"
  }
}
```

## 2. GET Single Blog Page

### Endpoint
```
GET /api/blog/{blogId}
```

### Example Request
```
GET /api/blog/cuid123...
```

### Expected Response
```json
{
  "id": "cuid123...",
  "title": "Getting Started with Next.js",
  "content": "# Getting Started with Next.js...",
  "excerpt": "Learn the basics of Next.js...",
  "slug": "getting-started-with-nextjs",
  "published": true,
  "createdAt": "2025-01-23T07:10:12.000Z",
  "updatedAt": "2025-01-23T07:10:12.000Z",
  "author": "John Doe",
  "tags": "Next.js,React,JavaScript,Web Development",
  "readTime": 5,
  "views": 1
}
```

## 3. CREATE New Blog Page

### Endpoint
```
POST /api/blog
```

### Request Body
```json
{
  "title": "My New Blog Post",
  "content": "# My New Blog Post\n\nThis is the content of my new blog post...",
  "excerpt": "A brief description of my blog post",
  "slug": "my-new-blog-post",
  "published": true,
  "author": "Your Name",
  "tags": "Blog,Personal,Writing",
  "readTime": 3
}
```

### Required Fields
- `title`: Blog post title (3-200 characters)
- `content`: Blog post content (minimum 10 characters)

### Optional Fields
- `excerpt`: Brief description
- `slug`: URL-friendly identifier (auto-generated from title if not provided)
- `published`: Boolean (default: false)
- `author`: Author name
- `tags`: Comma-separated tags
- `readTime`: Reading time in minutes

### Expected Response (201 Created)
```json
{
  "id": "cuid456...",
  "title": "My New Blog Post",
  "content": "# My New Blog Post\n\nThis is the content of my new blog post...",
  "excerpt": "A brief description of my blog post",
  "slug": "my-new-blog-post",
  "published": true,
  "createdAt": "2025-01-23T07:15:30.000Z",
  "updatedAt": "2025-01-23T07:15:30.000Z",
  "author": "Your Name",
  "tags": "Blog,Personal,Writing",
  "readTime": 3,
  "views": 0
}
```

## 4. UPDATE Blog Page

### Endpoint
```
PUT /api/blog/{blogId}
```

### Request Body
```json
{
  "title": "Updated Blog Post Title",
  "content": "# Updated Content\n\nThis is the updated content...",
  "excerpt": "Updated excerpt",
  "published": true,
  "author": "Updated Author",
  "tags": "Updated,Tags,Here",
  "readTime": 5
}
```

### Expected Response
```json
{
  "id": "cuid456...",
  "title": "Updated Blog Post Title",
  "content": "# Updated Content\n\nThis is the updated content...",
  "excerpt": "Updated excerpt",
  "slug": "my-new-blog-post",
  "published": true,
  "createdAt": "2025-01-23T07:15:30.000Z",
  "updatedAt": "2025-01-23T07:20:45.000Z",
  "author": "Updated Author",
  "tags": "Updated,Tags,Here",
  "readTime": 5,
  "views": 0
}
```

## 5. DELETE Blog Page

### Endpoint
```
DELETE /api/blog/{blogId}
```

### Example Request
```
DELETE /api/blog/cuid456...
```

### Expected Response (200 OK)
```json
{
  "message": "Blog page deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Title and content are required"
}
```

### 404 Not Found
```json
{
  "error": "Blog page not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch blog pages"
}
```

## Thunder Client Collection Setup

1. **Create New Collection**: "Blog Pages API"
2. **Set Base URL**: `http://localhost:3000`
3. **Add Environment Variables**:
   - `baseUrl`: `http://localhost:3000`
   - `blogId`: `cuid123...` (replace with actual ID from GET response)

## Test Scenarios

### Scenario 1: Basic CRUD Operations
1. **GET** all blog pages
2. **POST** a new blog page
3. **GET** the specific blog page by ID
4. **PUT** to update the blog page
5. **DELETE** the blog page

### Scenario 2: Search and Filter
1. **GET** all published blog pages
2. **GET** blog pages with search term "nextjs"
3. **GET** blog pages with tag "React"
4. **GET** unpublished blog pages

### Scenario 3: Pagination
1. **GET** first page with limit 2
2. **GET** second page with limit 2
3. Verify pagination metadata

### Scenario 4: Error Handling
1. **POST** with missing required fields
2. **GET** non-existent blog page
3. **PUT** non-existent blog page
4. **DELETE** non-existent blog page

## Notes
- All timestamps are in ISO 8601 format
- The `views` field is automatically incremented on each GET request
- Slug conflicts are handled automatically
- Content validation ensures minimum quality standards
