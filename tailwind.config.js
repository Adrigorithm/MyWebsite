/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html"
  ],
  theme: {
    extend: {
      colors: {
        'black-overlay': 'oklch(0% 0 0 / 50%)',
        'white-overlay': 'oklch(100% 0 0 / 50%)',
      }
    },
  },
  plugins: [],
}
