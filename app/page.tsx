import Blog from "@/components/blog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const post = {
  id: "post-1",
  title: "Getting Started with shadcn/ui Components",
  summary:
    "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
  label: "Tutorial",
  author: "Sarah Chen",
  published: "1 Jan 2024",
  url: "https://shadcnblocks.com",
  image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
};

export default function Home() {
  return (
    <div>
      <div>
        <Card className="grid grid-rows-[auto_auto_1fr_auto] pt-0">
          <div className="aspect-[16/9] w-full">
            <a
              target="_blank"
              className="transition-opacity duration-200 fade-in hover:opacity-70"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover object-center"
              />
            </a>
          </div>
          <CardHeader>
            <h3 className="text-lg font-semibold hover:underline md:text-xl">
              <a href={post.url} target="_blank">
                {post.title}
              </a>
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{post.summary}</p>
          </CardContent>
          <CardFooter>
            <a
              href={post.url}
              target="_blank"
              className="flex items-center text-foreground hover:underline"
            >
              Read more
              <ArrowRight className="ml-2 size-4" />
            </a>
          </CardFooter>
        </Card>

        <div>desc</div>
      </div>
      <Blog />
    </div>
  );
}
