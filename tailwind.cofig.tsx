import type { Config } from "tailwindcss"
import defaultConfig from "tailwindcss/defaultConfig"

const config: Config = {
  ...defaultConfig,
  content: [
    ...defaultConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      fontFamily: {
        sans: ["Poiret One", "Inter", "sans-serif"], // Default font
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
        poiret: ["Poiret One", "sans-serif"], // Custom class
      },
      colors: {
        ...defaultConfig.theme.extend.colors,
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
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
