/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cover images for blog posts (and other admin-uploaded content) are
    // served from the backend's own /uploads endpoint (local dev) or
    // Cloudinary (deployed — the backend now uploads there instead of local
    // disk, which doesn't persist on Vercel's serverless functions) —
    // next/image refuses any host not listed here.
    remotePatterns: [
      { protocol: "https", hostname: "ssj-backend-chi.vercel.app" },
      { protocol: "http", hostname: "localhost", port: "5000" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
