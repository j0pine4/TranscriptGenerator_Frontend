/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary-pink': {
          '50': '#fef1fc',
          '100': '#fde6fa',
          '200': '#feccf6',
          '300': '#ffa2ef',
          '400': '#fd69e1',
          '500': '#f73dcf',
          '600': '#e71bb1',
          '700': '#d20d98',
          '800': '#a60e77',
          '900': '#8a1165',
          '950': '#55023b',
        },
        'secondary': '#1C63E7',
        'dark-gray': '#1E1E1E',
        'light-gray': '#9A9A9A',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),
  ],
}

