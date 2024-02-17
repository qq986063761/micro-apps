const { defineConfig } = require('@vue/cli-service')

let name = 'task'
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 允许主应用跨域访问
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`, // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
    },
  },
})
