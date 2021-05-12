module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        glight: ["Gilroy"],
        gbold: ["Gilroy-Bold"],
      },
      colors: {
        myRed: "#FF6666",
        myBlue: "#4B69AA",
      },
      zIndex: {
        "-10": "-10",
      },
      height: {
        l1: "500px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
