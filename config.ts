import { DefaultSeoProps } from "next-seo";

export const headerConfig = {};

export const siteConfig = {
  url: "https://imchanyo.github.io",
  title: "chans blog",
  description: "개발하면서 탐구한 것을 소소하게 기록하는 공간입니다.",
  copyright: "chans © All rights reserved.",
  since: 2024,
  googleAnalyticsId: "",
  author: {
    name: "ChanYoung Kim",
    photo: "",
    bio: "Frontend Engineer",
    contacts: {
      email: "chanyoung3320@gmail.com",
      github: "https://github.com/imchanyo",
    },
  },
  menus: [
    {
      label: "Blog",
      path: "/",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "tag",
      path: "/tag",
    },
  ],
};

export const seoConfig: DefaultSeoProps = {
  title: siteConfig.title,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: "website",
    locale: "ko-KR",
    url: siteConfig.url,
    siteName: siteConfig.title,
  },
  additionalMetaTags: [
    {
      name: "author",
      content: siteConfig.author.name,
    },
  ],
};
