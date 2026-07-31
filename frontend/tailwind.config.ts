import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#E87722",
          foreground: "#ffffff",
          dark: "#D16206",
        },
        secondary: {
          DEFAULT: "#f4f4f5",
          foreground: "#18181b",
        },
        maroon: {
          DEFAULT: "#6B1F1F",
          light: "#8B2E2E",
        },
        cream: {
          DEFAULT: "#FDF6EC",
          light: "#FFF8F1",
        },
        muted: {
          DEFAULT: "#f4f4f5",
          foreground: "#6B7280",
        },
        accent: {
          DEFAULT: "#f4f4f5",
          foreground: "#18181b",
        },
        border: "#E8DDD0",
      },
      fontFamily: {
        serif: ["EB Garamond", "Georgia", "serif"],
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          "2xl": "1440px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
