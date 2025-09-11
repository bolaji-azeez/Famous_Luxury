// tailwind.config.ts
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./app/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#D4AF37",
          hover: "#B89B30",
        },
        // avoid overriding Tailwind's built-in gray unless you *intend* to
        gray: {
          100: "#f7f7f7",
          200: "#e0e0e0",
          300: "#c7c7c7",
          400: "#a0a0a0",
          500: "#757575",
          600: "#5a5a5a",
          700: "#424242",
          800: "#212121",
          900: "#121212",
        },
        luxury: {
          gold: "#D4AF37",
          "gold-light": "#F4E4BC",
          "gold-dark": "#B8941F",
          charcoal: "#2C2C2C",
          "charcoal-light": "#404040",
          cream: "#FAF7F2",
          "cream-dark": "#F5F0E8",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate, forms],
};

export default config;
