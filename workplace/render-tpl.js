const pluginName = require('./../package.json').name;

module.exports = (api, options, rootOptions) => {

  /**
   * 来自 preset.json
   */
  const defaultSetting = {
    [pluginName]: {
      tinifyKey: 'tinifyKey',
      ticketUrl: 'ticketUrl',
      prodServiceUrl: 'prodServiceUrl',
      prodResourcePath: 'prodResourcePath',
      sitServiceUrl: 'sitServiceUrl',
      sitResourcePath: 'sitResourcePath',
      isSeparation: '0',
      isIndexHtml: '1',
      prodWebConfig: {
        ssh: {
          host: '',
          port: 0,
          username: '',
          password: ''
        },
        remotePath: ''
      },
      sitWebConfig: {
        ssh: {
          host: '',
          port: 0,
          username: '',
          password: ''
        },
        remotePath: ''
      },
      cdnConfig: {
        ssh: {
          host: '',
          port: 0,
          username: '',
          passphrase: '',
          privateKey: '' 
        },
        remotePath: ''
      },
    }
  }

  if(!rootOptions.plugins) {
    rootOptions.plugins = defaultSetting;
  } else {
    rootOptions.plugins = Object.assign({ ...defaultSetting }, rootOptions.plugins);
  }

  const {// preset
    tinifyKey,
    ticketUrl,
    prodServiceUrl,
    prodResourcePath,
    sitServiceUrl,
    sitResourcePath,
    isSeparation,
    isIndexHtml,
    prodWebConfig,
    sitWebConfig,
    cdnConfig,
  } = rootOptions.plugins[pluginName];

  const {// prompts
    cssPreprocessor,
    vuePreset,
    otherPreset,
    betterWebpack
  } = options;
  const adaptionSize = options.inputAdaptionSize ? options.inputAdaptionSize: options.adaptionSize;

  api.render('./../template', {

    router: vuePreset.includes('vue-router'),
    doesCompile: api.hasPlugin('babel'),
    mockjs: otherPreset.includes('mockjs'),
    imgspreload: otherPreset.includes('imgspreload'),

    tinifyKey,
    ticketUrl,
    prodServiceUrl,
    prodResourcePath,
    sitServiceUrl,
    sitResourcePath,
    isSeparation,
    isIndexHtml,
    prodWebConfig,
    sitWebConfig,
    cdnConfig,

    cssPreprocessor,
    adaptionSize,
    vuePreset,
    otherPreset,
    betterWebpack,
  });
}