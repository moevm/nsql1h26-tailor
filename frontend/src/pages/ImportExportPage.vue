<script setup lang="ts">
import { NFlex, NTabPane, NTabs } from 'naive-ui';
</script>

<template>
  <div class="import-export-page">
    <n-tabs type="line" animated>
      <n-tab-pane name="import" tab="Импорт">
        <n-flex justify="center" align="center" style="height: 200px; color: #999">
          Импорт
        </n-flex>
      </n-tab-pane>

      <n-tab-pane name="export" tab="Экспорт">
        <n-flex justify="center" align="center" style="height: 200px; color: #999">
          Экспорт
        </n-flex>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped lang="scss"></style>