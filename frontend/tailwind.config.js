/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tv-bg': '#131722',
        'tv-surface': '#1E222D',
        'tv-border': '#2A2E39',
        'tv-text': '#D1D4DC',
        'tv-text-secondary': '#787B86',
        'tv-blue': '#2962FF',
        'tv-green': '#26A69A',
        'tv-red': '#EF5350',
        'tv-yellow': '#FF9800',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Trebuchet MS', 'Roboto', 'Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}