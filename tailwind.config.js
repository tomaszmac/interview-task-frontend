/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: '#F3F4F8',
          surface: '#FFFFFF'
        },
        brand: {
          DEFAULT: '#1952E1',
          hover: '#1649CA',
          active: '#123DA9'
        },
        ink: {
          DEFAULT: '#1A1A1A',
          soft: '#33373C',
          muted: '#63666E',
          subtle: '#9A9DA4'
        },
        line: '#E2E4EA'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
