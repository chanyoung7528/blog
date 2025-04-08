// components/ui/DarkModeToggle.tsx
"use client";

import { useTheme } from "@/hooks/useTheme";
import styles from "@/styles/layout/DarkModeToggle.module.css";
import { useEffect } from "react";

const DarkModeToggle = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <>
      <input
        id="toggle"
        className={styles.toggle}
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
      />

      <label htmlFor="toggle" className={styles.title}>
        Toggle {theme}
      </label>
    </>
  );
};

export default DarkModeToggle;
