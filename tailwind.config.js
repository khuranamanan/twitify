module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        sm: { max: "639px" }, // Small screens (up to 639px)
        md: { max: "767px" }, // Medium screens (up to 767px)
        lg: { max: "1023px" }, // Large screens (up to 1023px)
        xl: { max: "1279px" }, // Extra large screens (up to 1279px)
      },
      fontFamily: {
        alata: ["Alata", "sans-serif"],
        robotoSlab: ["Roboto Slab", "serif"],
      },
      colors: {
        ...require("tailwindcss/colors"),
        cyan: "#3fc1c9",
        snow: "#f5f5f5",
        black: "#111111",
        aqua: "#67ced4",
        teal: "#2f9fa6",
        white: "#ffffff",
        gray: "#dddddd",
        lightGray: "#f1f1f1",
        blue: "#0000ff",
        red: "#ff0000",
        darkGray: "#999999",
        green: "#388e3c",
        offWhite: "#f9f9f9",
        darkerGray: "#2a2a2a",
      },
    },
  },
  plugins: [],
};
