module.exports = (api, options) => {

  const webpackVendor = options.webpackVendor;

  api.extendPackage({
    devDependencies: {
      'webpack-cdn-plugin': '^3.1.1'
    }
  });

  // if(webpackVendor === 'cdn') {
  //   api.extendPackage({
  //     devDependencies: {
  //       'webpack-cdn-plugin': '^3.1.1'
  //     }
  //   });
  // } else if(webpackVendor === 'dll') {
  //   api.extendPackage({
  //     scripts: {
  //       dll: 'webpack -p --progress --config ./webpack.dll.conf.js'
  //     }
  //   });
  // }
}