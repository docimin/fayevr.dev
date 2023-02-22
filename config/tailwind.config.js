const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary': '#0072FF',
      'secondary': '#00B0FF',
      'purple': '#682AE9',
      'blue': '#0072ff',
      'grey': '#d1d1d1',
      'blackgrey': '#0e1212',
      'red': '#f0514e',
      'hover': 'rgba(0, 229, 255)',
      'main-white': 'rgba(255, 255, 255, 0.8)',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ]
}
