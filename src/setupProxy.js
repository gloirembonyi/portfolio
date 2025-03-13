const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This is the path you will use in your fetch calls
    createProxyMiddleware({
      target: 'https://actual-gemini-api-endpoint', // Replace with your actual API endpoint
      changeOrigin: true,
    })
  );
};
