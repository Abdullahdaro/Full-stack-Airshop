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
        pink: "#F76E6E",
      },
      fontFamily: {
        'main': ['Segoe UI', 'sans-serif'],
        'second': ['Red Hat Display', 'sans-serif'],
      },
      fontSize: {
        '25': '25px',
        '50': '50px',
        '60': '60px',
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
    },
  },
  plugins: [],
}