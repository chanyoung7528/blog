type Author = {
  sys: Sys;
  name: String;
};
type Sys = {
  id: string;
  spaceId: string;
  environmentId: string;
  publishedAt: string;
  firstPublishedAt: string;
  publishedVersion: number;
};

type Asset = {
  title: String;
  description: string;
  contentType: string;
  fileName: string;
  url: string;
  size: number;
  width: number;
  height: number;
};

export type BlogPost = {
  sys: Sys;
  title: string;
  slug: string;
  publishedDate: string;
  content: string;
  shortDescription: string;
  featuredImage: Asset;
  tags: string[];
  category: string;
  href: string;
  author: Author;
};

export type ResponseData = {
  pageBlogPostCollection: {
    items: BlogPost[];
  };
};
