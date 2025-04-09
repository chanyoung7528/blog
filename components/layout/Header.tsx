"use client";

import DarkModeToggle from "@/components/ui/DarkModeToggle";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const Header = () => {
  const { systemTheme, theme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const shadowColor = (themeInfo: string) => {
    return themeInfo === "dark"
      ? "shadow-[0_5px_7px_0px_#050505]"
      : "shadow-[0_5px_7px_0px_#c2c2c280]";
  };
  const handleScroll = useCallback(() => {
    if (!theme) return;
    if (window.scrollY > 0) {
      headerRef.current?.classList.add(shadowColor(theme));
      return;
    }
    headerRef.current?.classList.remove(shadowColor(theme));
  }, [theme]);

  const headerRef = useRef<HTMLElement>(null);

  const initShadowClassList = () => {
    if (currentTheme === "dark") {
      headerRef.current?.classList.remove(shadowColor("light"));
      headerRef.current?.classList.add(shadowColor("dark"));
    } else {
      headerRef.current?.classList.remove(shadowColor("dark"));
      headerRef.current?.classList.add(shadowColor("light"));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    initShadowClassList();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme]);
  useEffect(() => {
    setHasMounted(true);
    console.log("hasMounted", hasMounted);
  }, []);
  return (
    <>
      {hasMounted && (
        <header
          ref={headerRef}
          className="sticky left-0 top-0 z-10 h-20 w-full bg-white  transition duration-500 dark:bg-[#1a1a1a]"
        >
          <DarkModeToggle />
        </header>
      )}
    </>
  );
};

export default Header;
