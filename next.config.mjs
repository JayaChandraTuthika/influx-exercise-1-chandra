/** @type {import('next').NextConfig} */
const nextConfig = {
  // assetPrefix: process.env.NODE_ENV === "production" ? "/_next/" : "",
  env: {
    CONVENIENCE_FEE: process.env.CONVENIENCE_FEE,
  },
};

export default nextConfig;
