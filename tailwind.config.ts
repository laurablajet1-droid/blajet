import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--c-ink)",
        surface: "var(--c-surface)",
        raised: "var(--c-raised)",
        line: "var(--c-line)",
        primary: "var(--c-text)",
        muted: "var(--c-muted)",
        faint: "var(--c-faint)",
        champagne: "var(--c-champagne)",
        "champagne-soft": "var(--c-champagne-soft)",
        good: "var(--c-good)",
        warn: "var(--c-warn)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        eyebrow: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.18em" }],
        display1: ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        display2: ["clamp(2rem, 4.4vw, 3.5rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        display3: ["clamp(1.5rem, 2.6vw, 2.125rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
      },
      borderRadius: { sm: "3px", DEFAULT: "5px", md: "6px", lg: "8px", xl: "10px" },
      boxShadow: {
        soft: "0 12px 32px -18px rgba(0,0,0,0.75)",
        lift: "0 20px 48px -24px rgba(0,0,0,0.85)",
      },
      spacing: { 18: "4.5rem", 22: "5.5rem", 30: "7.5rem" },
      maxWidth: { shell: "1280px" },
      transitionTimingFunction: { calm: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
    },
  },
  plugins: [],
};
export default config;