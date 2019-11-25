module.exports = (api, options, rootOptions) => {

  require('./render-tpl')(api, options, rootOptions);

  /**
   * delete some files
   */
  const filesToDelete = [
    'public/favicon.ico',
    'src/assets/logo.png',
    'src/components/HelloWorld.vue',
    'README.md'
  ];
  api.render(files =>
    Object.keys(files).filter(name =>
      filesToDelete.indexOf(name) > -1).forEach(name =>
        delete files[name]));

  /**
   * install base dependencies and devDependencies.
   */
  api.extendPackage({
    scripts: {
      build: 'vue-cli-service build --report',
      postbuild: 'gulp deployprodcdn',
      'build:sit': 'vue-cli-service build --mode sit --report',
      'postbuild:sit': 'gulp deploysit',
      fontmin: 'node fontmin',
      tiny: 'gulp tiny',
    },
    dependencies: {
      axios: '^0.19.0',
      vant: '^2.1.4',
      fastclick: '^1.0.6',
      qs: '^6.8.0'
    },
    devDependencies: {
      'cb-promisify': '^1.0.2',
      gulp: '^4.0.2',
      'gulp-ssh': '^0.7.0',
      vconsole: '^3.3.4',
      tinify: '^1.6.0-beta.2',
      'gulp-rename': '^1.4.0',
      'babel-plugin-import': '^1.12.0',
      fontmin: '^0.9.8',
      tinify: '^1.6.0-beta.2',
      'webpack-cdn-plugin': '^3.1.4'
    },
  });
}