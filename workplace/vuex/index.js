module.exports = api => {

  api.injectImports(api.entryFile, `import store from './store'`);
  api.injectRootOptions(api.entryFile, `store`);

  api.extendPackage({
    dependencies: {
      vuex: '^3.1.2'
    }
  });

  api.render('./template');
}