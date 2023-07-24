import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fafafa",
        primary: "#33cccc",
        black: "#09090b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        quote: ["'Source Serif 4'", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
