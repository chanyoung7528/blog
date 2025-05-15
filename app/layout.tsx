import "@/styles/global.css";
import StyleProvider from "@/components/layout/StyleProvider";
import type { Metadata } from "next";
import KBarProviders from "@/components/layout/KbarProvider";
import { allWritings } from "contentlayer/generated";

export const metadata: Metadata = {
  title: "카카오테크",
  description: "카카오테크, 미래의 문턱을 낮추는 기술",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="md:m mt-4 md:mt-0">
        <StyleProvider>
          <KBarProviders allWritings={allWritings}>{children}</KBarProviders>
        </StyleProvider>
      </body>
    </html>
  );
}
