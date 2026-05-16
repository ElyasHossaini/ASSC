import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Islamic green palette
        emeraldDark: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        // Royal blue accents
        royal: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Gold accents
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        arabic: ["var(--font-amiri)", "Georgia", "serif"],
        farsi: [
          "var(--font-vazirmatn)",
          "Tahoma",
          "system-ui",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "islamic-pattern":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23047857' stroke-width='1' stroke-opacity='0.12'%3E%3Cpath d='M40 0l40 40-40 40L0 40 40 0z'/%3E%3Cpath d='M40 10l30 30-30 30-30-30 30-30z'/%3E%3Cpath d='M40 20l20 20-20 20-20-20 20-20z'/%3E%3Ccircle cx='40' cy='40' r='8'/%3E%3C/g%3E%3C/svg%3E\")",
        "islamic-pattern-gold":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23d97706' stroke-width='1' stroke-opacity='0.18'%3E%3Cpath d='M40 0l40 40-40 40L0 40 40 0z'/%3E%3Cpath d='M40 10l30 30-30 30-30-30 30-30z'/%3E%3Cpath d='M40 20l20 20-20 20-20-20 20-20z'/%3E%3Ccircle cx='40' cy='40' r='8'/%3E%3C/g%3E%3C/svg%3E\")",
        "hero-gradient":
          "linear-gradient(135deg, rgba(6, 78, 59, 0.95) 0%, rgba(30, 58, 138, 0.92) 50%, rgba(6, 78, 59, 0.95) 100%)",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(6, 78, 59, 0.08), 0 2px 6px -1px rgba(6, 78, 59, 0.04)",
        elegant:
          "0 10px 40px -10px rgba(6, 78, 59, 0.18), 0 4px 12px -4px rgba(6, 78, 59, 0.06)",
        glow: "0 0 30px rgba(217, 119, 6, 0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
