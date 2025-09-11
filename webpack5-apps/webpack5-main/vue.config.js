const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'main',
        remotes: {
          child1: 'child1@http://localhost:8081/remoteEntry.js',
          child2: 'child2@http://localhost:8082/remoteEntry.js'
        },
        shared: {
          vue: {
            singleton: true,
            requiredVersion: '^2.6.14',
            eager: true,
            strictVersion: false
          },
          'vue-router': {
            singleton: true,
            requiredVersion: '^3.5.1',
            eager: true,
            strictVersion: false
          },
          vuex: {
            singleton: true,
            requiredVersion: '^3.6.2',
            eager: true,
            strictVersion: false
          }
        }
      })
    ]
  },
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
