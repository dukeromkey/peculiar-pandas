/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'panda-blue': '#8DC8EA',
        'panda-yellow': '#F9C80E',
        'panda-pink': '#FDB1B6',
      },
      fontFamily: {
        'ranchers': ['Roboto Flex', 'sans-serif']
      }
    },
  },
  plugins: [],
}
