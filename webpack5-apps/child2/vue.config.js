const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'auto',
  configureWebpack: {
    target: ["web", "es5"],
    output: {
      environment: {
        asyncFunction: false,
      }
    },
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'child2',
        filename: 'remoteEntry.js',
        exposes: {
          './AboutView': './src/views/AboutView.vue'
        },
        remotes: {
          'child1': 'child1@http://localhost:8081/remoteEntry.js'
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
