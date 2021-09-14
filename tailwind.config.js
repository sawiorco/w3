module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: "2rem",
    },
    extend: {
      gridTemplateColumns: {
        "fit-240": "repeat(auto-fit, minmax(240px, 1fr))",
      },

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
      scale: ["group-hover"],
      marginTop: ["first"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}
