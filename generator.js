module.exports = (api, options, rootOptions) => {

  console.log('\n[generator options]：\n', options);
  console.log('\n[generator rootOptions]：\n', rootOptions);

  /**
   * 基本模板
   */
  require('./workplace')(api, options, rootOptions);

  /**
   * 样式处理
   */
  require('./workplace/styles')(api, options);

  /**
   * webpackVendor处理
   */
  // require('./workplace/webpack')(api, options);

  /**
   * vue 周边常用
   */
  options['vuePreset'].forEach(item => require('./workplace/' + item)(api));

  /**
   * 其它常用
   */
  options['otherPreset'].forEach(item => require('./workplace/' + item)(api));
}