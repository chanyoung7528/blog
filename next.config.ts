import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  swcMinify: true,
  basePath: process.env.NODE_ENV === "production" ? "/imchanyo.github.io" : "",
  output: "export" as const,
  assetPrefix:
    process.env.NODE_ENV === "production" ? "https://imchanyo.github.io" : "",
};

export default withContentlayer(nextConfig);
