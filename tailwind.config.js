/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "fit5-gap4": "repeat(auto-fill, minmax(max(20%, 150px), 1fr))",
      },
    },
  },
  plugins: [],
};
