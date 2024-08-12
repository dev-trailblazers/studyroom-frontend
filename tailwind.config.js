/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#577FA7',
          50: '#EAEFF4',
          100: '#DDE5ED',
          200: '#C2D1DF',
          300: '#A7BCD1',
          400: '#8CA8C3',
          500: '#7293B5',
          600: '#577FA7',
          700: '#446382',
          800: '#31475D',
          900: '#1D2B38',
          950: '#141D26',
        },
        main: '#587fa7',
        blue_01: '#2e4663',
        blue_02: '#9ab3ca',
        blue_03: '#c6dded',
        blue_04: '#e8f0fa',
        blue_05: '#f1f8ff',
        gray_DD: '#ddd',
        gray_CC: '#ccc',
        gray_F5: '#f5f5f5',
        gray_77: '#777',
        white: '#fff',
        black: '#555',
      },
      boxShadow: {
        box_01: '1px 1px 10px rgba(0, 0, 0, 0.1)',
        box_02: '0 2px 5px rgba(0, 0, 0, 0.1)',
        box_03: '1px 1px 10px rgba(0, 0, 0, 0.25)',
      },
      screens: {
        lg_max: { max: '1000px' },
        sm_max: { max: '780px' },
      },
    },
  },
  plugins: [],
});
