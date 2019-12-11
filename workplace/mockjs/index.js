module.exports = api => {

  api.render({ 'mock/mock-api.js': './template/mock-api.js' });
  api.render({ 'mock/mock-data.js': './template/mock-data.js' });
  api.render({ 'mock/mock-server.js': './template/mock-server.js' });

  api.extendPackage({
    devDependencies: {
      '@babel/register': '^7.7.4',
      mockjs: '^1.1.0',
      chokidar: '^3.3.0'
    }
  });
}