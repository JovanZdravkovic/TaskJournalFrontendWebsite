/** @type {import('tailwindcss').Config} */
// Colors haven't been able to be loaded
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#23C686",
        "primary-light": "#2DEDA4",
        "primary-dark": "#1CA670",
        secondary: "#1D3853",
        "secondary-light": "#7A9295",
        danger: "#F32013"
      },
    },
  },
  plugins: [],
};
