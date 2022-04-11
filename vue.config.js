module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagounews.com'
        // changeOrigin: true // 把请求头中的 host 配置为 target
      },
      '/front': {
        target: 'http://edufront.lagounews.com'
        // changeOrigin: true
      }
    }
  }
}
