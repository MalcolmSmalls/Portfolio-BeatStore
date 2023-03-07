/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'Arial', 'sans-serif'],
      },
      colors: {
        'main-dark': '#131416',
        'lighter-dark': '#1d1e22',
        'darken-white': '#f2f2f2',
      },
    },
  },
  plugins: [],
}
