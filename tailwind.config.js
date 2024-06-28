// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}' ,  "./node_modules/flowbite/**/*.js"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}