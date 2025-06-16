"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import Navbar from "./Navbar";

import KBarButton from "../ui/KbarButton";
import DarkModeToggle from "../ui/DarkModeToggle";
import { Toggle } from "../ui/icons/toggle";

const Header = () => {
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  const [hasMounted, setHasMounted] = useState(false);
  const [onToggle, setOnToggle] = useState(false);

  // 마운트 후에만 useTheme() 호출
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const shadowColor = (themeMode: string) =>
    themeMode === "dark"
      ? "shadow-[0_5px_7px_0px_#050505]"
      : "shadow-[0_5px_7px_0px_#c2c2c280]";

  const handleScroll = useCallback(() => {
    const header = headerRef.current;
    if (!header || !currentTheme) return;

    const darkShadow = shadowColor("dark");
    const lightShadow = shadowColor("light");

    if (window.scrollY > 0) {
      header.classList.remove(
        currentTheme === "dark" ? lightShadow : darkShadow,
      );
      header.classList.add(shadowColor(currentTheme));
    } else {
      header.classList.remove(darkShadow);
      header.classList.remove(lightShadow);
    }
  }, [currentTheme]);

  const menuRouter = (location: string) => {
    router.push(location);
  };

  const handleToggle = (location?: string) => {
    const toggleEl = toggleRef.current;
    if (!toggleEl) return;

    if (onToggle) {
      toggleEl.classList.add("hidden");
      document.body.classList.remove("toggle");
    } else {
      toggleEl.classList.remove("hidden");
      document.body.classList.add("toggle");
    }

    setOnToggle((prev) => !prev);

    if (location) menuRouter(location);
  };

  const initShadowClassList = () => {
    const header = headerRef.current;
    if (!header || !currentTheme) return;

    const darkShadow = shadowColor("dark");
    const lightShadow = shadowColor("light");

    header.classList.remove(darkShadow, lightShadow);
    header.classList.add(shadowColor(currentTheme));
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    window.addEventListener("scroll", handleScroll);
    initShadowClassList();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentTheme, hasMounted, handleScroll]);

  if (!hasMounted) return null;

  return (
    <header
      ref={headerRef}
      className="sticky left-0 top-0 z-10 h-20 w-full bg-white  dark:bg-[#1a1a1a]"
    >
      <div className="mx-auto flex h-20 max-w-page flex-nowrap items-center justify-between gap-5 px-10 text-black">
        <div className="hidden items-center gap-5 text-center sm:flex">
          {/* <Navbar type="normal" onClick={menuRouter} /> */}
        </div>
        <div className="flex gap-5 maxSm:w-full maxSm:justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="m-0 hidden p-0 maxSm:flex"
              onClick={() => handleToggle()}
            >
              <Toggle />
            </button>

            <KBarButton />
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* 모바일 토글 메뉴 */}
      <div
        ref={toggleRef}
        className="absolute left-0 top-20 z-50 hidden h-screen w-full flex-col bg-white p-5 dark:bg-[#111111]"
      >
        <Navbar type="toggle" onClick={handleToggle} />
      </div>
    </header>
  );
};

export default Header;
