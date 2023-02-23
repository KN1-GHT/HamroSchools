module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ]
}