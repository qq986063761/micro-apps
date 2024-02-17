const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 跨域访问微应用
    // proxy: {
    //   '/okr': {
    //     target: 'http://localhost:8081',
    //     changeOrigin: true
    //   }
    // }
  }
})
