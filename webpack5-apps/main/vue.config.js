const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // Explicitly declare environment supports async/await to avoid external script warning
    target: ["web", "es2017"],
    output: {
      environment: {
        asyncFunction: true
      }
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "main",
        remotes: {
          "child1": "child1@http://localhost:8081/remoteEntry.js"
        }
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
