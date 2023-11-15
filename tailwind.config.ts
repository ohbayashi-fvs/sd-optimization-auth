/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        header: "#04274E",
        main: "#153F8D",
        sub: "#B9C3CF",
        attention: "#FFB800",
        error: "#E12929",
        hover: "#008e92",
      },
      animation: {
        modalOpen: "modalOpen 0.2s ease-in-out",
        modalClose: "modalClose 0.2s ease-in-out",
        fadeIn: "fadeIn 0.2s ease both",
        fadeOut: "fadeOut 0.2s ease both",
        leftToRight: "leftToRight 0.1s ease both",
        rightToLeft: "rightToLeft 0.1s ease both",
        defaultBtnClick: "defaultBtnClick 150ms ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        modalOpen: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        modalClose: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        leftToRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        rightToLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        defaultBtnClick: {
          "0%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
