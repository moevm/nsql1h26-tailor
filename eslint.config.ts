/**
 * @file eslint.config.ts
 * @description Конфигурация ESLint для фронтенда и бэкенда проекта.
 * @author @KorzikAlex @nhitar @DanilOtmakhov
 */
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  globalIgnores([
    'node_modules/**',
    'dist/**',
    'build/**',
    'coverage/**',
    'api/**',
    'src/metadata.ts',
  ]),
  // настройки для файлов .vue
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'vue/first-attribute-linebreak': ['off'],
    },
  },
  // frontend
  {
    basePath: 'frontend',
    files: ['**/*.{ts,tsx,mts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  // backend
  {
    basePath: 'backend',
    files: ['**/*.{ts,tsx,mts}'],
    languageOptions: {
      // используем парсер TypeScript ESLint для бэкенда
      parser: tseslint.parser,
      // указываем опции парсера для TypeScript
      parserOptions: {
        sourceType: 'commonjs',
      },
      // определяем глобальные переменные для Node.js и Jest
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    // правила для бэкенда
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  // отключаем правила, которые конфликтуют с Prettier
  eslintConfigPrettier,
]);
