module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        glight: ['Gilroy-Light'],
        gregular: ['Gilroy-Regular'],
        gbold: ['Gilroy-ExtraBold'],
        gmedium: ['Gilroy-Medium'],
        gheavy: ['Gilroy-Heavy']
      },
      colors: {
        myRed: '#FF6666',
        myBlue: '#4B69AA',
        myDarkBlue: '#091C32',
        myGrey: '#293045'
      },
      zIndex: {
        '-10': '-10'
      },
      height: {
        l1: '400px',
        l2: '460px',
        l3: '500px'
      },
      gridAutoRows: {
        10: '10px',
        1: '1px'
      },
      inset: {
        26: '105px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
