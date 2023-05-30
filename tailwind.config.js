/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/js/*.js',
    './index.html',
    './pages/*.html'
  ],
  theme: {
    extend: {
    },
    colors: {
      zaffre: '#000fb0',
      lightSteelBlue: '#B8CAE0',
      mediumPurple: '#8B80f9',
      black: '#000',
      white: '#fff'
    },
    fontFamily: {
      'ubuntu': ['Ubuntu', 'sans-serif'],
      'spectral': ['Spectral', 'serif'],
    }
  },
  plugins: [],
}
