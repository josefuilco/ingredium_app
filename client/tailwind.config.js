/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: {
          normal: '#27CFB1',
          hover: '#1FA68E'
        }
      }
    },
  },
  plugins: [],
}

