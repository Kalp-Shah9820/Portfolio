# Setup Instructions

## Environment Variables

To use Unsplash images in your blog and projects, you need to set up an API key:

### 1. Get Unsplash API Key

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create an account or sign in
3. Create a new application
4. Copy your Access Key

### 2. Create Environment File

Create a `.env.local` file in your project root:

```bash
# Unsplash API Key
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_actual_api_key_here
```

### 3. Restart Development Server

After adding the environment variable, restart your development server:

```bash
npm run dev
```

## Fallback Images

If no API key is configured, the application will automatically use placeholder images with the blog/project titles as text overlays.

## Troubleshooting

- Make sure the `.env.local` file is in the project root
- Ensure the API key is correct and active
- Check the browser console for any error messages
- The application will work with placeholder images even without an API key
