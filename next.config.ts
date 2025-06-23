import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nomadcoders.co"],
  },
};

export default withContentlayer(nextConfig);
