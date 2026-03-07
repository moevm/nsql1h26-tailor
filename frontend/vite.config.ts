/**
 * @file vite.config.ts
 * @description Конфигурационный файл для Vite
 * @author @KorzikAlex
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
