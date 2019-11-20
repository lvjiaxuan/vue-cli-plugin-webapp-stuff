module.exports = (api, options) => {

  const { cssPreprocessor, adaptionSize, adaptionType } = options;

  /**
   * css预处理器
   */
  if (cssPreprocessor !== 'css') {

    const deps = {
      scss: {
        sass: '^1.19.0',
        'sass-loader': '^7.1.0'
      },
      less: {
        less: '^3.0.4',
        'less-loader': '^4.1.0'
      },
      styl: {
        stylus: '^0.54.5',
        'stylus-loader': '^3.0.2'
      }
    }

    api.extendPackage({
      devDependencies: {
        ...deps[cssPreprocessor],
        'style-resources-loader': '^1.2.1'
      },
      vue: {
        pluginOptions: {
          'style-resources-loader': {
            preProcessor: cssPreprocessor,
            patterns: ['./src/styles/imports.' + cssPreprocessor]
          }
        }
      }
    });
  }

  /**
   * 页面适配尺寸
   */
  if(adaptionType === 'rem') {

    api.render({ [`src/styles/index.${ cssPreprocessor }`]: `./template/${ cssPreprocessor }/index.${ cssPreprocessor }` }, { adaptionSize });
    api.render({ [`src/styles/imports.${ cssPreprocessor }`]: `./template/${ cssPreprocessor }/imports.${ cssPreprocessor }` });
    api.render({ [`src/styles/${ adaptionSize }.css`]: `./template/${ adaptionSize }.css` });
  } else if(adaptionType === 'vw') {

    api.render({ [`src/styles/index.${ cssPreprocessor }`]: `./template/${ cssPreprocessor }/index.${ cssPreprocessor }` }, { adaptionSize: false });
    api.extendPackage({
      devDependencies: {
        'postcss-px-to-viewport': '^1.1.1'
      },
      postcss: {
        'postcss-px-to-viewport': {
          viewportWidth: adaptionSize,
        }
      }
    });
  }
}