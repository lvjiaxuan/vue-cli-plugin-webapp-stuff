module.exports = api => {

  api.render('./template');

  api.extendPackage({
    dependencies: {
      "vue-imgs-preload": "^0.1.3",
    }
  });
}