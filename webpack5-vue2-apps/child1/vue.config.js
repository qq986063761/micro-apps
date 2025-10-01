const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'auto', // 必须，不然 main 引入报错
  configureWebpack: {
    target: ["web", "es5"],
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
    optimization: {
      splitChunks: false // 必须，不然 main 引入报错
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "child1",
        // library: { type: "var", name: "child1" },
        filename: "remoteEntry.js",
        // 暴露组件
        exposes: {
          "./exposes": "./src/plugins/exposes.js",
          "./modal": "./src/components/modal.js",
        },
        // 依赖其他应用
        // remotes:{
        //     "lib-app":"lib_app@http://localhost:3000/remoteEntry.js"
        // },
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
      }),
    ],
  },
  devServer: {
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
