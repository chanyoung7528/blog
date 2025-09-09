import { Action } from "kbar";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config";

import MailIcon from "@/components/ui/icons/mail-icon";
import GithubIcon from "@/components/ui/icons/github-icon";
import HomeIcon from "@/components/ui/icons/home-icon";
import { AboutBoxIcon } from "@/components/ui/icons/about-box.icon";
import { TagBoxIcon } from "@/components/ui/icons/tag-box-icon";
import { ArchiveBoxIcon } from "@/components/ui/icons/archive-box-icon";
import { LibBoxIcon } from "@/components/ui/icons/lib-box-icon";
import type { BlogPost } from "@/app/types/query";

const icons: Record<string, React.ReactNode> = {
  email: <MailIcon />,
  github: <GithubIcon />,
};

export default function useKbarAction(allWritings: BlogPost[] = []) {
  const router = useRouter();

  const staticActions: Action[] = [
    {
      id: "home",
      name: "Home",
      shortcut: ["H"],
      keywords: "profile",
      section: "Pages",
      icon: <HomeIcon width={20} />,
      perform: () => router.push(`/`),
    },
    // {
    //   id: "about",
    //   name: "About",
    //   shortcut: ["B"],
    //   keywords: "about",
    //   section: "Pages",
    //   icon: <AboutBoxIcon />,
    //   perform: () => router.push(`/about`),
    // },
    {
      id: "tags",
      name: "Tags",
      shortcut: ["T"],
      keywords: "tags",
      section: "Pages",
      icon: <TagBoxIcon />,
      perform: () => router.push(`/tags`),
    },
    // {
    //   id: "archives",
    //   name: "Archives",
    //   shortcut: ["R"],
    //   section: "Pages",
    //   icon: <ArchiveBoxIcon />,
    //   perform: () => router.push(`/archives`),
    // },
  ];

  const contactActions: Action[] = Object.entries(siteConfig.author.contacts)
    .filter(([, link]) => !!link)
    .map(([sns, link]) => ({
      id: sns,
      name: sns,
      subtitle: link,
      section: "Social",
      icon: icons?.[sns],
      perform: () => window.open(link, "_blank"),
    }));

  const writingActions: Action[] = allWritings.map((el) => ({
    id: el.sys.id,
    name: el.title,
    section: "Posts",
    icon: <LibBoxIcon width={18} />,
    perform: () => router.push(`/posts/${el.slug}`),
  }));

  return [...staticActions, ...contactActions, ...writingActions];
}
