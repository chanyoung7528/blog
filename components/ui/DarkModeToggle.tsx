// components/ui/DarkModeToggle.tsx
"use client";

import { useTheme } from "@/hooks/useTheme";
import styles from "./DarkModeToggle.module.css";

const DarkModeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <input
        id="toggle"
        className={styles.toggle}
        type="checkbox"
        checked={!isDark}
        onChange={toggleTheme}
      />
      <div className={styles.background}></div>
      <label htmlFor="toggle" className={styles.title}>
        Toggle dark mode
      </label>
    </>
  );
};

export default DarkModeToggle;
