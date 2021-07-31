module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        glight: ['Gilroy-Light'],
        gbold: ['Gilroy-ExtraBold'],
        roboto: ['Roboto']
      },
      colors: {
        myRed: '#FF6666',
        myBlue: '#4B69AA'
      },
      zIndex: {
        '-5': '-5',
        '-10': '-10'
      },
      width: {
        l1: '400px',
        l2: '460px',
        l3: '500px'
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
      },
      animation: {
        floating: 'floating 1s ease-in-out infinite'
      },
      keyframes: {
        floating: {
          '0%': { transform: 'translate(0,0px)' },
          '50%': { transform: 'translate(0, 4px)' },
          '100%': { transform: 'translate(0, -0px)' }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
