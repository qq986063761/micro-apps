import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

const getRemote = (moduleName) => {
  return {
    external: new Promise((resolve) => {
      // 动态获取远程模块的 URL
      // 在 Node.js 环境中 window 不存在，使用默认值
      const url = (typeof window !== 'undefined' && window.__REMOTES__?.[moduleName]) 
        ? window.__REMOTES__[moduleName] 
        : `http://localhost:8081/remoteEntry.js`;
      resolve(url);
    }),
    externalType: 'promise'
  }
}

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'main',
      filename: 'remoteEntry.js',
      remotes: {
        child1: getRemote('child1'),
      },
      shared: {
        vue: {
          singleton: true,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
