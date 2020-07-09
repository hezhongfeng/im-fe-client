module.exports = {
  assetsDir: 'static',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001'
      },
      '/public': {
        target: 'http://127.0.0.1:7001'
      },
      '/socket.io': {
        target: 'http://127.0.0.1:7001',
        ws: true
      }
    },
    port: 3000
  },
  configureWebpack: {
    plugins: [],
    externals: {
      BMap: 'BMap',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      vant: 'vant'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // 不再需要sass-resources-loader
        prependData: '@import "@/common/style/var/color.scss";@import "@/common/style/var/size.scss";'
      }
    }
  }
};
