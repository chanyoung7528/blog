import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "img1.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "user-images.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default withContentlayer(nextConfig);
