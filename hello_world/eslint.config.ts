/**
 * @file eslint.config.ts
 * @description Конфигурационный файл для ESLint,
 * который определяет правила и настройки для проверки качества кода в проекте.
 * @author KorzikAlex
 * @license ISC
 */
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    languageOptions: {
      globals: globals.node,
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.json'],
    language: 'json/json',
    ignores: ['**/package-lock.json', '**/node_modules/**', '**/dist/**', '**/build/**', '**/tsconfig.json'],
    ...json.configs.recommended,
  },
  {
    files: ['**/*.md'],
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    ...markdown.configs.recommended,
  },
])
