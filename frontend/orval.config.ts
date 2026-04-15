import { resolve } from 'path';

import { defineConfig } from 'orval';

export default defineConfig({
  openapi: {
    input: {
      target: resolve(__dirname, '../openapi.json'),
    },
    output: {
      client: 'vue-query',
      httpClient: 'axios',
      clean: true,
      mode: 'tags',
      target: 'src/api',
      schemas: './src/api/schemas',
      baseUrl: {
        getBaseUrlFromSpecification: true,
      },
    },
    hooks: {
      afterAllFilesWrite: ['prettier --write "src/api/**/*.{ts,tsx}"'],
    },
  },
});
