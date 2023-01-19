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
        'panda-electric-blue': '#496A81',
        'panda-electric-dark': '#426076'
      },
      fontFamily: {
        'ranchers': ['Grandstander', 'cursive'],
        'rubik': ['Rubik', 'sans-serif']
      },
      backgroundImage: {
        'bamboo': "url('/images/bamboo_bg.png')"
      }
    },
  },
  plugins: [],
}
