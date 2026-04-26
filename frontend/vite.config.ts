/**
 * @file vite.config.ts
 * @description Конфигурационный файл для Vite
 * @author @KorzikAlex
 */
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '127.0.0.1',
    port: 8080,
    open: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 8080,
    open: true,
  },
  envDir: '..',
});
