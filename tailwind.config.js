/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        filecoin: "url('/public/filecoin.png')",
      },
      colors: {
        primary: "#1E1E1E",
        secondary: "#2b2b2b",
        tertiary: "#3F3F3F",
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
