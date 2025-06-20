import "@/styles/global.css";
import StyleProvider from "@/components/layout/StyleProvider";
import type { Metadata } from "next";
import { siteConfig } from "@/config";
import KBarProviders from "@/components/layout/KbarProvider";
import FloatScrollTopButton from "@/components/ui/float-scroll-top-button";
import GoogleAnalytics from "@/components/google-analytics";
import { allWritings } from "contentlayer/generated";
export const metadata: Metadata = {
  title: {
    template: "%s | chanyoung",
    default: "chanyoung.me",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className="md:m mt-4 md:mt-0">
        <StyleProvider>
          <KBarProviders allWritings={allWritings}>
            {children}
            <FloatScrollTopButton />
          </KBarProviders>
        </StyleProvider>
      </body>
      {process.env.NODE_ENV === "production" && <GoogleAnalytics />}
    </html>
  );
}
