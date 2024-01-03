// babel.config.js
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['import', {
      libraryName: 'uview-ui',
      customName: (name) => {
        return `uview-ui/lib/${name}/${name}`;
      }
    }]
  ]
}
