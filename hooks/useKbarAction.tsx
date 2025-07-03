import { Action } from "kbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config";

import MailIcon from "@/components/ui/icons/mail-icon";
import GithubIcon from "@/components/ui/icons/github-icon";
import HomeIcon from "@/components/ui/icons/home-icon";
import { AboutBoxIcon } from "@/components/ui/icons/about-box.icon";
import { TagBoxIcon } from "@/components/ui/icons/tag-box-icon";
import { ArchiveBoxIcon } from "@/components/ui/icons/archive-box-icon";
import { LibBoxIcon } from "@/components/ui/icons/lib-box-icon";

const icons: Record<string, React.ReactNode> = {
  email: <MailIcon />,
  github: <GithubIcon />,
};

interface Writing {
  _id: string;
  title: string;
  href: string;
}

export default function useKbarAction(allWritings: Writing[] = []) {
  const router = useRouter();
  const [actionData, setActionData] = useState<Action[]>([]);

  useEffect(() => {
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
      //   shortcut: ["B"], // 중복된 A -> B로 변경
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
      id: el._id,
      name: el.title,
      section: "Posts",
      icon: <LibBoxIcon width={18} />,
      perform: () => router.push(`${el.href}`),
    }));

    setActionData([...staticActions, ...contactActions, ...writingActions]);
  }, [allWritings, router]);

  return actionData;
}
