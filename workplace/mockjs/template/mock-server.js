const chokidar = require('chokidar');

const registeRoutes = app => {

  const mockRoutes = require('./mock-data');
  const mockRoutesLen = mockRoutes.length;
  const mockStartIdx = app._router.stack.length;

  mockRoutes.forEach(item => app.all('/mock' + item[0], (req, res, next) => {
    console.log('[' + req.method + ']', req.path);
    res.json(item[1]);
    next();
  }));
  return { mockRoutesLen, mockStartIdx }
}

module.exports = app => {

  require('@babel/register');

  let { mockRoutesLen, mockStartIdx } = registeRoutes(app);

  chokidar.watch(process.cwd() + '/mock', {
    ignored: /^mock-(server|api)/,
    ignoreInitial: true
  }).on('change', () => {
    try {

      // clear express route
      app._router.stack.splice(mockStartIdx, mockRoutesLen);
      delete require.cache[require.resolve('./mock-data')];

      // re-registe
      const mockRes = registeRoutes(app);
      mockRoutesLen = mockRes.mockRoutesLen;
      mockStartIdx = mockRes.mockStartIdx;

      console.log('\n > Mock Server hot reload success! changed');
    } catch(error) {
      console.log(error);
    }
  });
}