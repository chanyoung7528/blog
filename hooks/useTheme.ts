import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  const { theme, setTheme } = useNextTheme();

  useEffect(() => {
    const hours = new Date().getHours();
    const defaultDark = !(hours > 7 && hours < 20);

    setIsDark(defaultDark);
    setTheme(defaultDark ? "dark" : "light");
    // setTheme("light");
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");

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
