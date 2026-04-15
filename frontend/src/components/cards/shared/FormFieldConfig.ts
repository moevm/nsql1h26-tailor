import type { Component } from 'vue';

/**
 * Конфигурация поля формы
 */
export interface FormFieldConfig<TKey extends string> {
  key: TKey;
  label: string;
  placeholder: string;
  type?: 'text' | 'password';
  autocomplete?: string;
  icon: Component;
  class?: string;
  showPasswordOn?: 'click';
}
