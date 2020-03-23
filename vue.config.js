module.exports = {
  devServer: {
    open: true,
    proxy: 'http://127.0.0.1:7001',
    port: 3000
  }
};
