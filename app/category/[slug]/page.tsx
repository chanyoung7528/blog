import { Metadata, ResolvingMetadata } from "next";
import CategoryPageClient from "@/components/page/category/CategoryPageClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ tag?: string }>;
}

export async function generateMetadata(
  { params }: { params: PageProps["params"] },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryId = resolvedParams.slug;
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: { absolute: categoryId },
    description: categoryId,
    openGraph: {
      title: categoryId,
      description: categoryId,
      images: [
        "https://user-images.githubusercontent.com/65283190/262063367-a7407bba-09a0-420a-ae45-2ed3e6f3e3b8.png",
        ...previousImages,
      ],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.slug;
  return <CategoryPageClient categoryId={categoryId} />;
}
