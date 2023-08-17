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
        dark: "#202142",
        main: "#A4A4CB",
      },
      fontFamily: {
        'main': ['Segoe UI', 'sans-serif'],
        'second': ['Red Hat Display', 'sans-serif'],
        'mari': ['Merriweather', 'sans-serif']
      },
      fontSize: {
        '25': '25px',
        '50': '50px',
        '60': '60px',
      },
      screens: {
        xs: "380px",
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