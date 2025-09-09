import { cn } from "@/lib/utils";
import { unified } from "unified";
import type { Root, Element, Parent, Node } from "hast";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode, {
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";

function getTextFromNode(
  node: Node | Element | Parent | null | undefined,
): string {
  if (!node) return "";
  if (node.type === "text")
    return (node as unknown as { value?: string }).value || "";
  if ("children" in node && Array.isArray((node as Parent).children)) {
    return (node as Parent).children.map(getTextFromNode).join("");
  }
  return "";
}

function createHeadingId(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣 -]/g, "")
    .replace(/\s/g, "-");
}

function rehypeAddHeadingIds() {
  return (tree: Root) => {
    const visit = (node: Node) => {
      if (!node || typeof node !== "object") return;
      if (
        node.type === "element" &&
        ["h2", "h3", "h4"].includes((node as Element).tagName)
      ) {
        const text = getTextFromNode(node);
        const id = createHeadingId(text);
        (node as Element).properties = {
          ...((node as Element).properties || {}),
          id,
        };
      }
      if ("children" in node && Array.isArray((node as Parent).children)) {
        (node as Parent).children.forEach(visit);
      }
    };
    visit(tree);
  };
}

export default async function MarkdownRenderer({
  markdown,
  className,
}: {
  markdown?: string;
  className?: string;
}) {
  // prettier code 옵션
  const options: RehypePrettyCodeOptions = {
    theme: "material-theme-darker", // 문자열로만 지정해도 OK
    keepBackground: false,
    defaultLang: { block: "plaintext", inline: "plaintext" },
    onVisitLine(node) {
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
  };

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeAddHeadingIds)
    .use(rehypePrettyCode, options)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  const html = String(file);

  return (
    <article
      className={cn(
        "mdx dark:prose-invepnpm list rehype-pretty-code shikit prose max-w-none",
        className ?? "",
      )}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
