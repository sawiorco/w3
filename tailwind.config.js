module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: "2rem",
    },
    extend: {
      height: {
        128: "32rem",
      },

      fontFamily: {
        sans: ["Karla"],
        display: ["Karla"],
      },
    },
  },
  variants: {
    extend: {
      marginTop: ["first"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}