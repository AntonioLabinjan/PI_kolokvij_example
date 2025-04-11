/*
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
*/

module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),  // Update to use the new package
    require('autoprefixer')
  ]
};
