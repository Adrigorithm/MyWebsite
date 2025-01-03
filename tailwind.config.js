/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "js/*.js",
    "js/components/*.js",
    "js/components/shared/*.js"
  ],
  theme: {
    extend: {
      minWidth: {
        "1/2": "50%",
        "1/4": "25%",
        "1/6": "16.666667%",
      }
    },
  },
  plugins: [],
}

