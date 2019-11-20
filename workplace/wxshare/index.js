module.exports = api => {

  api.extendPackage({
    dependencies: {
      sha1: '^1.1.1',
      'weixin-js-sdk': '^1.5.0',
    }
  });

  api.render({ './src/utils/wx-share.js': './template/wx-share.js' });
}