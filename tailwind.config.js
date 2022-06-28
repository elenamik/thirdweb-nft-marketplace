/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        josephin: ['Josefin Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
}
