import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      fontFamily: {
        sans: ["Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Georgia", "Times New Roman", "serif"],
        logo: ["Avenir Next", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        terminal: "0.08em",
        logo: "0.18em",
      },
      boxShadow: {
        luxe: "0 26px 90px rgba(45, 92, 162, 0.18)",
        glow: "0 0 0 1px rgba(45,92,162,0.12), 0 24px 70px rgba(45,92,162,0.14)",
      },
    },
  },
  plugins: [animate],
};

export default config;
