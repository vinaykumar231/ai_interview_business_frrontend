/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { 
    screens: {
    xl: { max: "1025px" },
    lg: { max: "769px" },
    md: { max: "426px" },
    sm: { max: "376px" },
    xs: { max: "320px" },
  },
    extend: {},
  },
  plugins: [],
}

