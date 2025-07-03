import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nomadcoders.co"],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default withContentlayer(nextConfig);
