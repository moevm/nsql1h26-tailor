<script setup lang="ts">
/**
 * @file App.vue
 * @description Главный компонент приложения,
 * обеспечивающий глобальные провайдеры и маршрутизацию.
 * @author @KorzikAlex
 */
import {
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  dateRuRU,
  ruRU,
} from 'naive-ui';
</script>

<template>
  <n-config-provider :locale="ruRU" :date-locale="dateRuRU">
    <n-global-style />
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <router-view />
          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped lang="scss"></style>
