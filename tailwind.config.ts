import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "oab-blue": "#002D72",
        "oab-red": "#B91C1C",

        correct: "#2563EB",
        "correct-dark": "#1D4ED8",
        "correct-light": "#DBEAFE",

        incorrect: "#DC2626",
        "incorrect-dark": "#B91C1C",
        "incorrect-light": "#FEE2E2",
      },
    },
  },
  plugins: [],
} satisfies Config;
