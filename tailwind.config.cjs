/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [], // 사용 안 하는 클래스 강제 포함 X
  theme: {
    fontFamily: {
      sans: ['"Pretendard Variable"', "sans-serif"],
      heading: ['"KakaoBigSans-ExtraBold"', "sans-serif"],
    },
    fontSize: {
      base: "1rem", // 16px
      body: ["1rem", { lineHeight: "1.75rem" }],
      heading: ["2rem", { fontWeight: "700", lineHeight: "2.5rem" }],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      fg: "var(--fg)",
      bg: "var(--bg)",
      tx: "var(--text-color)",
      alpha: "var(--alpha)",
      shadow: "var(--shadow-color)",
      white: "var(--white)",
      black: "var(--black)",
      indigo: "var(--indigo)",
      gray1: "var(--gray1)",
      gray2: "var(--gray2)",
      gray3: "var(--gray3)",
      gray4: "var(--gray4)",
      gray5: "var(--gray5)",
      gray6: "var(--gray6)",
      gray7: "var(--gray7)",
      gray8: "var(--gray8)",
      gray9: "var(--gray9)",
      gray10: "var(--gray10)",
      gray11: "var(--gray11)",
      black1: "var(--black1)",
      black2: "var(--black2)",
      black3: "var(--black3)",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      maxSm: { max: "640px" },
      maxMd: { max: "768px" },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        main: "auto 640px auto",
      },
      maxWidth: {
        page: 1200,
        content: 640,
      },
      width: {
        page: 1072,
        content: 640,
      },
      transitionDuration: {
        instant: "0ms",
        fastest: "80ms",
        fast: "100ms",
        med: "160ms",
        xx: "240ms",
        xxl: "320ms",
        long: "480ms",
        slow: "1200ms",
      },
      spacing: {
        page: "var(--page-top)",
      },
    },
  },
  plugins: [
    /** @type {import('tailwindcss/types/config').PluginCreator} */
    ({ addUtilities }) => {
      addUtilities({});
    },
    require("@tailwindcss/typography"),
  ],
};
