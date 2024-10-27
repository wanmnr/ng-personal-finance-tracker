/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#your-primary-color",
      },
      spacing: {
        16: "4rem", // For header height
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
