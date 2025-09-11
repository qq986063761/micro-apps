const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      library: 'child2',
      libraryTarget: 'umd',
      globalObject: 'self'
    },
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
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
