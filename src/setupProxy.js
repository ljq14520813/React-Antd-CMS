// const proxy = require('http-proxy-middleware');
//create-react-app上的过时写法

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:9999',   // 目标服务器
      changeOrigin: true
    })
  );
};