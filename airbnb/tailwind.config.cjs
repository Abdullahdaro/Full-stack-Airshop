/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#222222",
        secondary: "#FAFAFA",
        pink: "#FF9D9D",
      },
      fontFamily: {
        'main': ['FZYaoTi'],
        "second": ["Red Hat Display"]
      },
      fontSize: {
        '25': '25px'
      },
    },
  },
  plugins: [],
}