/**
 * @description Конфигурация для генерации API-клиента на основе OpenAPI
 */
import { resolve } from 'path';

import { defineConfig } from 'orval';

export default defineConfig({
  openapi: {
    input: {
      target: resolve(__dirname, '../openapi.json'),
    },
    output: {
      client: 'axios',
      httpClient: 'axios',
      clean: true,
      mode: 'tags',
      target: 'src/api',
      schemas: './src/api/schemas',
      baseUrl: process.env.VITE_API_URL,
    },
    hooks: {
      afterAllFilesWrite: ['prettier --write "src/api/**/*.{ts,tsx}"'],
    },
  },
});
