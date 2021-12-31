module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",

  theme: {
    screens: {
      "mobile-s": "320px",
      "mobile-m": "375px",
      "mobile-l": "425px",
      "tablet-s": "530px",
      tablet: "768px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        // bgblack: "#010001",
        bgblack: "#0D1117",
        bgBlackSec: "#141921",
        bgWhiteSec: "#F6F8FA",
        bgyellow: "#FCDC60",
        // bgyellow: "#FFD237",
      },
    },
  },
  plugins: [],
};
