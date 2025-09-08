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

/**
 * Render Markdown (with optional embedded HTML) to styled HTML inside an article element.
 *
 * Processes the provided Markdown string (YAML frontmatter is removed) through a Unified pipeline
 * that parses Markdown, preserves and renders any raw HTML present in the content, applies
 * syntax highlighting (rehype-pretty-code) and stringifies to HTML. The resulting HTML is injected
 * into an <article> using dangerouslySetInnerHTML.
 *
 * Note: raw HTML in `content` is allowed and will be rendered as-is.
 *
 * @param content - Markdown source to render (may include YAML frontmatter and raw HTML)
 * @param className - Optional additional className(s) added to the article element
 * @returns A React element containing the rendered HTML
 */
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
