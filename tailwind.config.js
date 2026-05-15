const figmaColors = {
  main: '#1A1A1A',
  mainLightBg: '#F3F4F9',
  mainUniversalDarkerBg: '#E2E4EA',
  mainUniversalLighten1: '#33373C',
  mainUniversalLighten2: '#63666E',
  mainUniversalLighten3: '#9A9DA4',
  repIoPrimary: '#1952E1'
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: figmaColors.main,
          'light-bg': figmaColors.mainLightBg
        },
        'main-universal': {
          'main-lighten-1': figmaColors.mainUniversalLighten1,
          'main-lighten-2': figmaColors.mainUniversalLighten2,
          'main-lighten-3': figmaColors.mainUniversalLighten3,
          'darker-bg': figmaColors.mainUniversalDarkerBg
        },
        'rep-io': {
          primary: figmaColors.repIoPrimary
        },
        app: {
          bg: figmaColors.mainLightBg,
          surface: '#FFFFFF'
        },
        brand: {
          DEFAULT: figmaColors.repIoPrimary,
          hover: '#1649CA',
          active: '#123DA9'
        },
        ink: {
          DEFAULT: figmaColors.main,
          soft: figmaColors.mainUniversalLighten1,
          muted: figmaColors.mainUniversalLighten2,
          subtle: figmaColors.mainUniversalLighten3
        },
        line: figmaColors.mainUniversalDarkerBg
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        toast: '0 12px 32px rgba(26, 26, 26, 0.18)'
      }
    }
  },
  plugins: []
};
