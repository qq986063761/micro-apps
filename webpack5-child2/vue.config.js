const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'child2',
        filename: 'remoteEntry.js',
        exposes: {
          './HelloWorld': './src/components/HelloWorld.vue',
          './HomeView': './src/views/HomeView.vue'
        },
        shared: {
          vue: {
            singleton: true,
            requiredVersion: '^2.6.14'
          },
          'vue-router': {
            singleton: true,
            requiredVersion: '^3.5.1'
          },
          vuex: {
            singleton: true,
            requiredVersion: '^3.6.2'
          }
        }
      })
    ]
  },
  devServer: {
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
