module.exports = (api, projectOptions) => {

  const pluginOptions = projectOptions.pluginOptions || {} ;

  api.chainWebpack(config => {

    config.plugin('hard-source-webpack').use(require('hard-source-webpack-plugin'));

    config.plugin('html').tap(args => {
      args[0].meta = Object.assign({
        viewport: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no',
        'X-UA-Compatible': {
          'http-equiv': 'X-UA-Compatible',
          'content': 'IE=edge'
        },
        'utf-8': {
          'charset': 'utf-8'
        },
      }, pluginOptions.useMetaCacheControl ? {
        'Cache-Control': {
          'http-equiv': 'Cache-Control',
          'content': 'no-cache, no-store'
        },
        'Pragma': {
          'http-equiv': 'Pragma',
          'content': 'no-cache'
        },
        'Expires': {
          'http-equiv': 'Expires',
          'content': '0'
        },
      } : {});

      return args;
    });
  });
}