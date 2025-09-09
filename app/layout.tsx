import "@/styles/global.css";
import "@/styles/mdx-contentful.css";
import StyleProvider from "@/components/layout/StyleProvider";
import type { Metadata } from "next";
import { siteConfig } from "@/config";
import KBarProviders from "@/components/layout/KbarProvider";
import FloatScrollTopButton from "@/components/ui/FloatScrollTopButton";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PostsStoreInitializer from "@/components/PostsStoreInitializer";
import { getAllPosts } from "@/lib/contentful";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    template: "%s | chans.dev",
    default: "chans.dev",
  },
  description: "Develop about something Soft and Simple.",
  openGraph: {
    images: [
      "https://user-images.githubusercontent.com/65283190/262039301-7ca908de-e523-478e-b0af-b70665dd7703.jpg",
    ],
    locale: "ko_KR",
  },
  icons: {
    shortcut: "/favicon.ico",
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getAllPosts({ revalidate });
  const posts = data?.pageBlogPostCollection?.items ?? [];
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        {process.env.NODE_ENV === "production" && <GoogleAnalytics />}
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <iframe
            src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <StyleProvider>
          <PostsStoreInitializer posts={posts}>
            <KBarProviders>
              {/* <GlobalPrefetch /> */}
              <Header />
              {children}
              <Footer />
              <FloatScrollTopButton />
            </KBarProviders>
          </PostsStoreInitializer>
        </StyleProvider>
      </body>
    </html>
  );
}
