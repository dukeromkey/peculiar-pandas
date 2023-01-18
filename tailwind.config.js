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
        // 'panda-yellow': '#F7B538',
        'panda-blue': '#8DC8EA',
        'panda-yellow': '#F9C80E',
        'panda-pink': '#FDB1B6',
      }
    },
  },
  plugins: [],
}
