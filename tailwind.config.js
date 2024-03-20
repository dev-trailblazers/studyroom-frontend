/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#587fa7',
        blue_01: '#2e4663',
        blue_02: '#9ab3ca',
        blue_03: '#c6dded',
        blue_04: '#e8f0fa',
        blue_05: '#f1f8ff',
        gray_DD: '#ddd',
        gray_CC: '#ccc',
        gray_F5: '#f5f5f5',
        white: '#fff',
        black: '#555',
      },
      boxShadow: {
        box_01: '1px 1px 10px rgba(0, 0, 0, 0.1)',
        box_02: '0 2px 5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
