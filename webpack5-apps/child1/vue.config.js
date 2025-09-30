const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: "child1",
        library: { type: "var", name: "child1" },
        filename: "remoteEntry.js",
        // 暴露组件
        exposes: {
          "./Button": "./src/components/Button.vue",
        },
        // 依赖其他应用
        // remotes:{
        //     "lib-app":"lib_app@http://localhost:3000/remoteEntry.js"
        // },
        shared: ['vue']
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
