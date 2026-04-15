<script setup lang="ts">
import {
  type GlobalThemeOverrides,
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  dateRuRU,
  ruRU,
} from 'naive-ui';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#023370',
    primaryColorHover: '#01428e',
    primaryColorPressed: '#01428e',
    primaryColorSuppl: '#01428e',
  },
};
</script>

<template>
  <n-config-provider
    :locale="ruRU"
    :date-locale="dateRuRU"
    :theme-overrides="themeOverrides"
  >
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
