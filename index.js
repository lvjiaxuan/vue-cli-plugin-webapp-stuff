module.exports = (api, projectOptions) => {

  const { pluginOptions } = projectOptions;

  api.chainWebpack(webpackConfig => {

    // 通过 webpack-chain 修改 webpack 配置
    webpackConfig.plugin('html').tap(args => {
      args[0].title = JSON.stringify(pluginOptions);
      args[0].meta = Object.assign({
        viewport: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no',
        'X-UA-Compatible': {
          'http-equiv': 'X-UA-Compatible',
          'content': 'IE=edge'
        },
        'utf-8': {
          'charset': 'utf-8'
        },
      }, !pluginOptions.nonMetaCache ? {
        'Cache-Control': {
          'http-equiv': 'Cache-Control',
          'content': 'no-cache, no-store, must-revalidate'
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

//   api.configureWebpack(webpackConfig => {
//     // 修改 webpack 配置
//     // 或返回通过 webpack-merge 合并的配置对象
//   });
  
//   api.registerCommand('test', args => {
//     // 注册 `vue-cli-service test`
//   });
}