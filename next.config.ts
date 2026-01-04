import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com", "picsum.photos"], // ✅ Allow Unsplash, placeholder, and picsum images
  }
};

export default nextConfig;
