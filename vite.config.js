import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.wanandroid.com', // 目标服务器地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，去掉 `/api` 前缀
      },
    },
  },
});

