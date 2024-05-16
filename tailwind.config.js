/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,tx,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: ['business'],
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
