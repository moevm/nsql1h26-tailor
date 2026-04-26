import type { Component } from 'vue';

/**
 * Элемент навигации
 */
export interface NavItem {
  text: string;
  href: string;
  icon?: Component;
}