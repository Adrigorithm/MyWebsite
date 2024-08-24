/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/js/*.js',
    './index.html'
  ],
  theme: {
    extend: {
    },
    colors: {
      transBlue: 'lab(78 -20 -31)',
      transPink: 'lab(76 30 4)',
      transWhite: 'lab(93 0 0)',
      fluoPink: 'lab(44 71 -10)',
      nightBlack: 'lab(9 0 0)'
    },
    fontFamily: {
      'ubuntu': ['Ubuntu', 'sans-serif'],
      'youngSerif': ['YoungSerif', 'serif'],
    }
  },
  plugins: [],
}
