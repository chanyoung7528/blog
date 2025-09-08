import { cn } from "@/lib/utils";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode, {
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";

const BT = "`";
const TBT = "```";

// 샘플 마크다운
const MOCK_MD = `
# rehype-pretty-code Demo 🎨

inline code: ${BT}const answer = 42${BT}

${TBT}ts title="app/demo.ts" {1,6}#hot /import/ /const/ showLineNumbers
import fs from "node:fs/promises"
import path from "node:path"

type User = {
  id: string
  name: string
}

export const getUser = (id: string): User => ({ id, name: "chance" })
${TBT}

${TBT}bash caption="install"
pnpm add rehype-pretty-code shiki
${TBT}
`;

export default async function PrettyCodeDemo({
  markdown,
  className,
}: {
  markdown?: string;
  className?: string;
}) {
  const content = markdown ?? MOCK_MD;

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
    .use(rehypePrettyCode, options)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

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
