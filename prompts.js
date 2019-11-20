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
    message: '请选择适配方案（默认dpr=2）',
    type: 'list',
    default: 'rem',
    choices: [{
      name: 'rem布局',
      value: 'rem'
    }, {
      name: 'vw方法（postcss-px-to-viewport）',
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
    }]
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

  // {
  //   name: 'webpackVendor',
  //   message: '请选择webpack优化方式',
  //   type: 'list',
  //   default: 'cdn',
  //   choices: [
  //     {
  //       name: 'webpack-cdn-plugin',
  //       value: 'cdn'
  //     },
  //     {
  //       name: 'dll（需自行配置entry入口）',
  //       value: 'dll'
  //     }
  //   ]
  // }
]