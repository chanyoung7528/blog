"use client";

import { ThemeProvider } from "next-themes";

export default function StyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <div className="bg-white dark:bg-black3">{children}</div>
    </ThemeProvider>
  );
}
