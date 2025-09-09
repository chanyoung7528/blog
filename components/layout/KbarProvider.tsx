"use client";
import { KBarProvider, useRegisterActions, type Action } from "kbar";

import dynamic from "next/dynamic";
import useKBarAction from "@/hooks/useKbarAction";
import { usePostsStore } from "@/stores/usePostsStore";

const KBar = dynamic(() => import("@/components/ui/Kbar"), { ssr: false });

export default function KBarProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { posts } = usePostsStore();
  const actions = useKBarAction(posts);

  return (
    <KBarProvider>
      <KbarActionsRegistrar actions={actions} />
      <KBar />
      {children}
    </KBarProvider>
  );
}

function KbarActionsRegistrar({ actions }: { actions: Action[] }) {
  useRegisterActions(actions, [actions]);
  return null;
}
