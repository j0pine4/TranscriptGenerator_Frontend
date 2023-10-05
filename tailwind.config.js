/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#D20D98',
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

