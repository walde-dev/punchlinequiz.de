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
      animation: {
        shake: "shake 0.5s linear 1",
      },
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0) rotate(0.5deg)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0) rotate(-1deg)" },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0) rotate(0.5deg)",
          },
          "40%, 60%": { transform: "translate3d(4px, 0, 0) rotate(-0.5deg)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
