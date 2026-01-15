import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

const getRemote = (moduleName) => {
  return `promise new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = window.__REMOTES__['${moduleName}'];
    script.type = 'text/javascript';
    script.onload = () => {
      // 代理对象：透传 get/init 给远端容器
      const proxy = {
        get: (request) => window['${moduleName}'].get(request),
        init: (arg) => {
          try { return window['${moduleName}'].init(arg); } catch (e) { /* already initialized */ }
        }
      };
      resolve(proxy);
    };
    script.onerror = (e) => {
      console.error('Failed to load remote ${moduleName}:', script.src, e);
    };
    document.head.appendChild(script);
  })`
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
