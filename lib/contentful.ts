import type { ResponseData } from "@/app/types/query";

type FetchOptions = {
  revalidate?: number;
  tags?: string[];
};

const isPreview = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === "true";
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const TOKEN = isPreview
  ? process.env.NEXT_CONTENTFUL_PREVIEW_ACCESS_TOKEN
  : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

const GET_ALL_POSTS_STRING = `
  query GetAllPosts($limit: Int = 10, $skip: Int = 0) {
    pageBlogPostCollection(limit: $limit, skip: $skip) {
      items {
        sys {
          id
        }
        title
        slug
        shortDescription
        featuredImage {
          url
        }
        content
        publishedDate
        tags
        category
      }
    }
  }
`;

const GET_POST_BY_SLUG_STRING = `
  query GetPostBySlug($slug: String!) {
    pageBlogPostCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        title
        slug
        shortDescription
        featuredImage {
          url
        }
        content
        publishedDate
        tags
        category
      }
    }
  }
`;

export async function contentfulFetch<T>(
  query: string,
  variables: Record<string, unknown>,
  options?: FetchOptions,
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: options?.tags
      ? { tags: options.tags }
      : options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
  });

  if (!res.ok) {
    throw new Error(`Contentful fetch failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data as T;
}

export async function getAllPosts(opts?: FetchOptions): Promise<ResponseData> {
  return contentfulFetch<ResponseData>(
    GET_ALL_POSTS_STRING,
    { limit: 100, skip: 0 },
    {
      ...opts,
      tags: opts?.tags ?? ["posts"],
    },
  );
}

export async function getPostBySlug(
  slug: string,
  opts?: FetchOptions,
): Promise<ResponseData> {
  return contentfulFetch<ResponseData>(
    GET_POST_BY_SLUG_STRING,
    { slug },
    {
      ...opts,
      tags: opts?.tags ?? ["post", `post:${slug}`],
    },
  );
}

export { GET_ALL_POSTS_STRING, GET_POST_BY_SLUG_STRING };
