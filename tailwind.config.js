/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "blue",
      },
      spacing: {
        16: "4rem", // For header height
      },
      scale: {
        102: "1.02",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
