/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      minHeight: {
        screen: '100dvh',
      },
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
        'title': ['"Gochi Hand"', 'cursive', ...defaultTheme.fontFamily.sans],
        'secondary': ['"Indie Flower"', 'cursive', ...defaultTheme.fontFamily.sans],
        'secondary-bolder': ['"Patrick Hand"', 'cursive', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}