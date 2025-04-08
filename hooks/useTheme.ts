import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
  const [isDark, setIsDark] = useState(true);
  const { theme, setTheme } = useNextTheme();

  useEffect(() => {
    const hours = new Date().getHours();
    const defaultDark = !(hours > 7 && hours < 20);
    setIsDark(defaultDark);
    setTheme("light");
    console.log(theme);
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? "dark" : "light");
    console.log("theme", theme, isDark);
    setIsDark((prev) => {
      const next = !prev;
      return next;
    });
  };

  return {
    isDark,
    theme,
    toggleTheme,
  };
};
