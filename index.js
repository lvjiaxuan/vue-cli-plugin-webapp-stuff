module.exports = (api, projectOptions) => {

  const pluginOptions = projectOptions.pluginOptions || {} ;

  api.chainWebpack(config => {

    // config.plugin('hard-source-webpack').use('hard-source-webpack-plugin');

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

    if(!pluginOptions.isIndexHtml) {
      // img
      config.module.rule('images').use('url-loader').tap(options => {
        options.fallback.options.name = 'img/[name].[hash:8].[ext]';
        return options;
      });

      // svg
      config.module.rule('svg').use('file-loader').tap(options => {
        options.name = 'img/[name].[hash:8].[ext]';
        return options;
      });

      // media
      config.module.rule('media').use('url-loader').tap(options => {
        options.fallback.options.name = 'media/[name].[hash:8].[ext]'
        return options;
      });

      // fonts
      config.module.rule('fonts').use('url-loader').tap(options => {
        options.fallback.options.name = 'fonts/[name].[hash:8].[ext]'
        return options;
      });
    }
  });
}