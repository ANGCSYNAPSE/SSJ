/** @type {import('next').NextConfig} */
// The backend, as the server sees it. The browser never talks to it directly for
// sign-in, sessions or account calls: it calls this site's own /api/v1/..., and
// Next forwards the request. That makes the refresh cookie first-party, so it
// survives page reloads in every browser (Safari and Chrome both block the
// cookie of a different site) and no CORS is involved.
const BACKEND = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/+$/, "");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: "/api/v1/:path*", destination: `${BACKEND}/api/v1/:path*` }];
  },
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
