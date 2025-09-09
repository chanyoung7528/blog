import nextMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nomadcoders.co", "images.ctfassets.net"],
  },
  experimental: {
    optimizeCss: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"], // MDX 확장자 추가
};

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: "github-dark", // 테마 설정 (light/dark 모드: { light: "github-light", dark: "github-dark" })
  keepBackground: false, // 배경 유지 여부
  // 추가적인 rehype-pretty-code 옵션 (필요 시)
  // onVisitLine(node) { /* 커스텀 라인 처리 */ },
};

/** @type {import('@next/mdx').NextMDXOptions} */
const mdxOptions = {
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [], // 필요 시 remark 플러그인 추가
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]], // rehype-pretty-code 추가
  },
};

const withMDX = nextMDX(mdxOptions);
export default withMDX(nextConfig);
