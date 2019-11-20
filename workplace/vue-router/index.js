module.exports = api => {

  api.injectImports(api.entryFile, `import router from './router'`);
  api.injectRootOptions(api.entryFile, `router`);

  api.extendPackage({
    dependencies: {
      'vue-router': '^3.1.2'
    }
  });

  api.render('./template');
}