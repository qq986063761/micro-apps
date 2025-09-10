const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'child1',
        filename: 'remoteEntry.js',
        exposes: {
          './HelloWorld': './src/components/HelloWorld.vue',
          './AboutView': './src/views/AboutView.vue'
        },
        shared: {
          vue: {
            singleton: true,
            requiredVersion: '^2.6.14',
            eager: true
          },
          'vue-router': {
            singleton: true,
            requiredVersion: '^3.5.1',
            eager: true
          },
          vuex: {
            singleton: true,
            requiredVersion: '^3.6.2',
            eager: true
          }
        }
      })
    ]
  },
  devServer: {
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
