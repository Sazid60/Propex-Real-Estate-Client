/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        amatic: ['"Amatic SC"', 'sans-serif'],
        gruppo: ['"Gruppo"', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
}
