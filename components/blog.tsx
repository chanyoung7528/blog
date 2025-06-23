import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface Blog7Props {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  posts: Post[];
}

const Blog = ({
  posts = [
    {
      id: "post-1",
      title: "Getting Started with shadcn/ui Components",
      summary:
        "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
      label: "Tutorial",
      author: "Sarah Chen",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
    {
      id: "post-2",
      title: "Building Accessible Web Applications",
      summary:
        "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
      label: "Accessibility",
      author: "Marcus Rodriguez",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
    {
      id: "post-3",
      title: "Modern Design Systems with Tailwind CSS",
      summary:
        "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
      label: "Design Systems",
      author: "Emma Thompson",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
  ],
}: Blog7Props) => {
  return (
    <section>
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
            >
              <div className="aspect-[16/9] w-full">
                <a
                  href={post.url}
                  target="_blank"
                  className="fade-in transition-opacity duration-200 hover:opacity-70"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover object-center"
                    width={100}
                    height={100}
                  />
                </a>
              </div>
              <CardHeader>
                <h3 className="text-lg md:text-xl font-semibold hover:underline">
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
                  className="text-foreground flex items-center hover:underline"
                >
                  Read more
                  <ArrowRight className="size-4 ml-2" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
