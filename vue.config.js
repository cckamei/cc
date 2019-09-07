const path = require('path');

module.exports = {
  productionSourceMap: false,
  outputDir: process.env.DIST,
  css: {
    loaderOptions: {
      css: {},
      less: {
        data: `@import '~@/style/vars.less'`
      },
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 75
          })
        ]
      }
    }
  },
  devServer: {
    // 设置主机地址
    host: '0.0.0.0',
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      '/api': {
        target: 'http://47.105.53.172',
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/style/vars.less')]
    }
  }
};
