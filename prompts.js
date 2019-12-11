module.exports = [

  {
    name: 'cssPreprocessor',
    message: '请选择css预处理器',
    type: 'list',
    default: 'css',
    choices: [{
      name: '（不使用）css',
      value: 'css',
    }, {
      name: 'less',
      value: 'less',
    }, {
      name: 'sass/scss(dart-sass)',
      value: 'scss',
    }, {
      name: 'stylus',
      value: 'styl',
    }]
  },

  {
    name: 'adaptionType',
    message: '请选择适配方案',
    type: 'list',
    default: 'rem',
    choices: [{
      name: 'rem布局',
      value: 'rem'
    }, {
      name: 'vw方式（postcss-px-to-viewport）',
      value: 'vw'
    }]
  },

  {
    name: 'adaptionSize',
    message: '请选择设计图分辨率',
    type: 'list',
    default: 750,
    choices: [{
      name: '750px',
      value: 750
    }, {
      name: '640px',
      value: 640,
    }, {
      name: '输入',
      value: 0
    }]
  },

  {
    name: 'inputAdaptionSize',
    message: '请输入设计图分辨率',
    type: 'input',
    validate(value) {
      return +value >= 320 ? true : '至少大于320px';
    },
    when({ adaptionSize }) {
      return adaptionSize === 0;
    }
  },

  {
    name: 'vuePreset',
    message: '请选择vue常用',
    type: 'checkbox',
    choices: [{
      name: 'vuex',
      value: 'vuex',
    }, {
      name: 'vue-router',
      value: 'vue-router',
    }]
  },

  {
    name: 'otherPreset',
    message: '请选择其它常用',
    type: 'checkbox',
    default: ['mockjs', 'imgspreload'],
    choices: [{
      name: '微信分享wx-share.js',
      value: 'wxshare'
    }, {
      name: 'mockjs',
      value: 'mockjs'
    }, {
      name: '图片预加载组件',
      value: 'imgspreload'
    }]
  },

  {
    name: 'betterWebpack',
    message: '请选择webpack优化方式',
    type: 'checkbox',
    default: ['cdn', 'hard'],
    choices: [
      {
        name: 'webpack-cdn-plugin',
        value: 'cdn'
      }
    ]
  }
]