import type { Component } from 'vue';
import type { ModelType } from './ModelType';

/**
 * Конфигурация поля формы
 */
export interface FormFieldConfig {
  key: keyof ModelType;
  label: string;
  placeholder: string;
  type?: 'text' | 'password';
  autocomplete?: string;
  icon: Component;
  class?: string;
  showPasswordOn?: 'click';
}
