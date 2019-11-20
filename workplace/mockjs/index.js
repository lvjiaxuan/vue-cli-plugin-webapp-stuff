module.exports = api => {

  api.render({ 'mock/mock-api.js': './template/mock-api.js' });
  api.render({ 'mock/mock-data.js': './template/mock-data.js' });
  api.render({ 'mock/mock-server.js': './template/mock-server.js' });

  api.extendPackage({
    devDependencies: {
      '@babel/register': '^7.5.5',
      mockjs: '^1.0.1-beta3',
      chokidar: '^3.0.2'
    }
  });
}