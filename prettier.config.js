/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  parser: 'typescript',
  plugins: {
    require('prettier-plugin-tailwindcss')
  },
}
