module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        finary: ["2px solid #F1C086", "2px"]
      },
      colors: {
        yellow: { finary: "#F1C086" },
        gray: {
          finary: "#292929"
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
