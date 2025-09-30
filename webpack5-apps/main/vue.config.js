const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'auto',
  configureWebpack: {
    // Explicitly declare environment supports async/await to avoid external script warning
    // target: ["web", "es5"],
    output: {
       // 禁止新语法，支持老浏览器
      environment: {
        asyncFunction: false,
        // arrowFunction: false,
        // const: false,
        // forOf: false,
        // dynamicImport: false,
        // module: false,
        // destructuring: false,
        // bigIntLiteral: false,
        // 按需继续禁用
      }
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "main",
        // 引用其他模块暴漏的资源
        remotes: {
          "child1": "child1@http://localhost:8081/remoteEntry.js"
          // "child1": "child1@http://127.0.0.1:49243/remoteEntry.js"
        },
        // 共享一个包
        // shared: {
        //   vue: {
        //     eager: true,
        //     singleton: true, // 公用一个 vue 实例
        //     // requiredVersion: '^2.6.14'
        //   },
        //   "vuex": {
        //     eager: true,
        //     singleton: true, // 公用一个 vuex 实例
        //     // requiredVersion: '^3.6.2'
        //   },
        //   "vue-router": {
        //     eager: true,
        //     singleton: true, // 公用一个 vue-router 实例
        //     // requiredVersion: '^3.5.1'
        //   }
        // }
      })
    ]
  },
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    allowedHosts: 'all'
  }
})
