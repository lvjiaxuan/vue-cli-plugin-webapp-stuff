module.exports = (api, options) => {

  const adaptionSize = options.inputAdaptionSize ? options.inputAdaptionSize: options.adaptionSize;
  const {
    cssPreprocessor,
    // adaptionSize,
    adaptionType
  } = options;

  api.extendPackage({
    dependencies: {
      'normalize.css': '^8.0.1',
    }
  });

  /**
   * css预处理器
   */
  if (cssPreprocessor !== 'css') {

    const devDependencies = {
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
        ...devDependencies[cssPreprocessor],
        'style-resources-loader': '^1.3.2'
      }
    });
  }

  /**
   * 页面适配文件
   */
  api.render({ [`src/styles/index.${ cssPreprocessor }`]: `./template/${ cssPreprocessor }/index.${ cssPreprocessor }` }, { adaptionType, adaptionSize });
  if(adaptionType === 'rem') {

    api.render({ [`src/styles/imports.${ cssPreprocessor }`]: `./template/${ cssPreprocessor }/imports.${ cssPreprocessor }` });
    api.render({ [`src/styles/adaption-${ adaptionSize }.css`]: `./template/adaption.css` }, { adaptionSize });
  } else if(adaptionType === 'vw') {

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