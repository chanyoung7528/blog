import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  const { theme, setTheme } = useNextTheme();

  useEffect(() => {
    setIsDark(false);
    setTheme("light");
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
    setIsDark((prev) => !prev);
  };

  return {
    isDark,
    theme,
    toggleTheme,
  };
};
