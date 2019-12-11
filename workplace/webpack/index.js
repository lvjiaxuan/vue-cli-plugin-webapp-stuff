module.exports = (api, options) => {

  options.betterWebpack.includes('cdn') &&
  api.extendPackage({
    devDependencies: {
      'webpack-cdn-plugin': '^1.0.18'
    }
  });
}