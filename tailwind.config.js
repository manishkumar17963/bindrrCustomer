module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient:
          'linear-gradient(90.58deg,#373b44 0%,#73c8a9 50.52%, #373b44 100%)',
        buttonGradient:
          'linear-gradient(120.58deg,#373b44 0%,#73c8a9 50.52%, #373b44 100%)',
      },
      transitionProperty: {
        height: 'height',
      },

      margin: {
        top: '4rem',
      },

      height: {
        height: 'calc(100vh - 4rem)',
        cardImage: '300px',
        smallCard: '145px',
        68: '17rem',
        4.5: '18px',
      },

      borderWidth: {
        DEFAULT: '1px',
        '1px': '1px',
        0.5: '2px',
      },

      colors: {
        primary: '#5581FB', //blueColor
        secondary: '#73C8A980',
        primaryText: '#3C3C3C',
        secondaryText: '#616161', //blackText,
        background: '#FAFAFA',

        shade: '#F5F5F5',
        button: '#E1372D',
        opaque: '#ACB1B6',
        // card: '#9CA3AF', //bg-gray-400(dark mode)
        // background2: '#1F2937', //bg-gray-800(dark mode)
        // iconColor: '#4B5563', //bg-gray-600(dark mode)
        // notification: '#d1d5db', //bg-gray-300(dark mode)
        // message: '#9CA3AF', //bg-gray-400(dark mode)
        card: '#F3F4F6', //bg-gray-200(light mode)
        background2: '#FFFFFF', //bg-white(light mode)
        iconColor: '#9CA3AF', //bg-gray-400(light mode)
        message: '#4B5563', //bg-gray-600(light mode)
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      width: {},
    },
  },
  variants: {
    height: ['responsive', 'hover', 'focus'],
  },

  plugins: [],
}
