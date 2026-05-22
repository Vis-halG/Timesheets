/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["Caveat", "Segoe Print", "cursive"],
      },
      boxShadow: {
        soft: "0 18px 55px rgba(27, 36, 48, 0.12)",
      },
    },
  },
  plugins: [],
};
