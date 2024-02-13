/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  darkMode:'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    screens:{
      ...defaultTheme.screens,
      'xs':'450px'
    },
    
    extend: {
    },
  },
  plugins: [],
}

