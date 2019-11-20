const path = require('path');
const chokidar = require('chokidar');
const childProcess = require('child_process');

const resolve = dir => path.join(__dirname, dir);

const isIndexHtml = process.env.VUE_APP_ISINDEXHTML === '1';// index html or jsp
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const port = 9090;

module.exports = {

  publicPath: isDevelopment ? './' : process.env.VUE_APP_RESOURCE_URL,

  filenameHashing: isIndexHtml,

  productionSourceMap: !isProduction,

  devServer: {
    <%_ if(mockjs) { %>
    port,
    proxy: {
      [process.env.VUE_APP_SERVICE_API]: {
        target: `http://127.0.0.1:${ port }`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_SERVICE_API]: '/mock'
        }
      }
    },
    after: require('./mock/mock-server'),
    <%_ } %>
    before: app => {
      chokidar.watch(process.cwd() + '/src/assets/images', {
        ignored: /\.(?!(png|jpg)$)/,
        ignoreInitial: true
      }).on('add', path => {
        console.log('开始压缩新图片，请稍等...');
        childProcess.exec('gulp tiny', process.cwd(), (error, stdout, stderr) => console.log('压缩完成：', path))
      });
    },
  },

  chainWebpack(config) {

    /**
     * 依赖图分析
     */
    config.plugin('webpack-bundle').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [{
      // analyzerMode: 'server',
      analyzerMode: 'disabled',
      openAnalyzer: false
    }]);

    /**
     * cdn 优化
     */
    !isDevelopment && config.plugin('webpack-cdn').use('webpack-cdn-plugin', [{
      optimize: true,
      prodUrl: 'https://cdn.jsdelivr.net/npm/:name@:version/:path',
      modules: [{
        name: 'vue',
        var: 'Vue',
        path: 'dist/vue.runtime.min.js'
      }, {
        name: 'axios',
        path: 'dist/axios.min.js'
      }]
    }]);

    /**
     * **保持filenameHashing: false的img、media、fonts版本hash**
     * 
     * *因为js和css的hash是由cli-server设置，并不是通过loader的方式设置了*
     */
    if(!isIndexHtml) {

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
  }
}