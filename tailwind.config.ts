import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e40af",
          dark: "#1e3a8a",
          light: "#3b82f6",
        },
        accent: {
          DEFAULT: "#f59e0b",
          dark: "#d97706",
          light: "#fbbf24",
        },
      },
      spacing: {
        '26': '6.5rem', // 104px for navbar height (legacy)
        '32': '8rem', // 128px for navbar + top bar (mobile)
        '36': '9rem', // 144px for navbar + top bar (desktop)
        '44': '11rem', // 176px for navbar + top bar + banner (mobile)
        '48': '12rem', // 192px for navbar + top bar + banner (desktop)
      },
    },
  },
  plugins: [],
};
export default config;

