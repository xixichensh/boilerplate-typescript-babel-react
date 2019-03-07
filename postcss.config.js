module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-pxtorem')({
      rootValue: 75,
      minPixelValue: 2,
      propWhiteList: []
    })
  ]
}