import { cn } from "@/lib/utils";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode, {
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import "@/styles/mdx-contentful.css";

// frontmatter 제거
const removeFrontmatter = (content: string) =>
  content ? content.replace(/^---[\s\S]*?---\s*/, "") : "";

export default async function MarkdownRenderer({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const mdContent = removeFrontmatter(content);

  // rehype-pretty-code 옵션 타입 정의
  const prettyCodeOptions: RehypePrettyCodeOptions = {
    theme: {
      dark: "one-dark-pro",
    },
    keepBackground: true,
    defaultLang: {
      block: "plaintext",
      inline: "plaintext",
    },
    grid: false,
    onVisitLine(node) {
      // 빈 줄의 기본 높이 방지
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
    onVisitHighlightedLine(node) {
      // 하이라이트된 줄에 클래스 추가
      node.properties.className = [
        ...(node.properties.className || []),
        "highlight-line",
      ];
    },
    // onVisitHighlightedWord는 rehype-pretty-code Options 타입에 존재하지 않으므로 제거
  };

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(mdContent);

  const html = String(file);

  return (
    <article
      className={cn("mdx prose max-w-none dark:prose-invert", className ?? "")}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
