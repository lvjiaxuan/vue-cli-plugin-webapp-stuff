const path = require('path');
const chokidar = require('chokidar');
const childProcess = require('child_process');

const isIndexHtml = process.env.VUE_APP_ISINDEXHTML === '1';// index html or jsp
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const port = 9090;

module.exports = {

  publicPath: isDevelopment ? './' : process.env.VUE_APP_RESOURCE_URL,

  filenameHashing: isIndexHtml,

  productionSourceMap: !isProduction,

  pluginOptions: {
    isIndexHtml
  },

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
    after: require('./mock/mock-server'),<%_ } %>
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

    <%_ if(cssPreprocessor !== 'css') { %>
    /**
     * 样式自动化导入
     */
    ;['normal', 'normal-modules', 'vue', 'vue-modules'].forEach(type => {
      config.module.rule('<%= cssPreprocessor %>').oneOf(type)
        .use('style-resources-loader')
          .loader('style-resources-loader')
          .options({ patterns: [path.resolve(__dirname, './src/styles/imports.<%= cssPreprocessor %>')] })
    });
    <%_ } %>

    <%_ if(betterWebpack.includes('cdn')) { %>
    /**
     * 第三方库 cdn 优化
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
    <%_ } %>

    /**
     * **保持filenameHashing: false的img、media、fonts版本hash**
     * 
     * *因为js和css的hash是由cli-server设置，并不是通过loader的方式设置了*
     */
    // isIndexHtml
  }
}