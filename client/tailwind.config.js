/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          normal: '#FC9057',
          hover: '#CA7346'
        }
      }
    },
  },
  plugins: [],
}

