/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        first: "#031716",
        second: {
          DEFAULT: "#032F30",
          100: "#0A7075",
          200: "#0C969C",
        },
        third: "#6BA3BE",
        fourth: "#CDCDE0",
        fifth: "#274D60",
      },
    },
  },
  plugins: [],
};
