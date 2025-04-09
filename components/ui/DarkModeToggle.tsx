"use client";

import { useTheme } from "@/hooks/useTheme";
import styles from "@/styles/layout/DarkModeToggle.module.css";

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
      <label htmlFor="toggle" className={styles.title} />
    </>
  );
};

export default DarkModeToggle;
