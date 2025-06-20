"use client";
import { KBarProvider } from "kbar";

import dynamic from "next/dynamic";
import useKBarAction from "@/hooks/useKbarAction";
import { Writing } from "contentlayer/generated";
import { AllWritingsProvider } from "@/contexts/AllWritingsContext";

const KBar = dynamic(() => import("@/components/ui/Kbar"), { ssr: false });

export default function KBarProviders({
  children,
  allWritings,
}: {
  children: React.ReactNode;
  allWritings: Writing[];
}) {
  const actions = useKBarAction(allWritings);

  if (actions?.length === 0 || !actions) return null;
  return (
    <AllWritingsProvider writings={allWritings}>
      <KBarProvider actions={actions}>
        <KBar />
        {children}
      </KBarProvider>
    </AllWritingsProvider>
  );
}
