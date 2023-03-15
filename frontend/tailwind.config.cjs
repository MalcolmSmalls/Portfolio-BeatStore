/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'Arial', 'sans-serif'],
        PressStart: ['"Press Start 2P"', 'Arial'],
        Staatliches: ['"Staatliches"', 'Arial'],
      },
      colors: {
        'main-dark': '#131416',
        'lighter-dark': '#1d1e22',
        'darken-white': '#f2f2f2',
        golden: 'rgba(243,200,72,255)',
        'light-gray': 'rgb(91, 91, 106)',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(80px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 1s ease-out',
        'fade-out-down': 'fade-out-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out',
        'fade-in': 'fade-in 1s ease-out',
      },
    },
  },
  plugins: [],
}
