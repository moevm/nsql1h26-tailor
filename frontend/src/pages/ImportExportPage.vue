<script setup lang="ts">
import { exportApi } from '@/api/export';
import { importApi } from '@/api/import';
import {
  NButton,
  NCheckbox,
  NTabPane,
  NTabs,
  NUpload,
  useMessage,
} from 'naive-ui';
import type { UploadFileInfo } from 'naive-ui';
import { onMounted, onUnmounted, ref } from 'vue';

onMounted(() => {
  message.destroyAll()
  message.info(
    'Реализация функций импорта и экспорта будет выполнена в дальнейшем в прототипе "Анализ"',
  );
});

onUnmounted(() => {
  message.destroyAll();
});

const message = useMessage();

const exportUsers = ref(true);
const exportOrders = ref(true);
const exportAnalytics = ref(false);
const isExporting = ref(false);

const importUsers = ref(true);
const importOrders = ref(true);
const importFileList = ref<UploadFileInfo[]>([]);
const isImporting = ref(false);

async function handleExport() {
  if (!exportUsers.value && !exportOrders.value && !exportAnalytics.value) {
    message.warning('Выберите хотя бы один пункт для экспорта');
    return;
  }
  isExporting.value = true;
  try {
    const res = await exportApi.exportReport({
      users: exportUsers.value,
      orders: exportOrders.value,
    });
    if (res.data) {
      message.success('Экспорт выполнен');
    } else {
      message.warning(
        'Реализация данной функции будет выполнена в дальнейшем в прототипе "Анализ"',
      );
    }
  } catch {
    message.error(
      'Реализация данной функции будет выполнена в дальнейшем в прототипе "Анализ"',
    );
  } finally {
    isExporting.value = false;
  }
}

async function handleImport() {
  if (!importUsers.value && !importOrders.value) {
    message.warning('Выберите хотя бы один тип данных для импорта');
    return;
  }
  if (!importFileList.value.length) {
    message.warning('Выберите файл для импорта');
    return;
  }
  isImporting.value = true;
  try {
    const res = await importApi.importData({
      users: importUsers.value,
      orders: importOrders.value,
    });
    if (res.data) {
      message.success('Данные успешно импортированы');
      importFileList.value = [];
    } else {
      message.warning(
        'Реализация данной функции будет выполнена в дальнейшем в прототипе "Анализ"',
      );
    }
  } catch {
    message.error(
      'Реализация данной функции будет выполнена в дальнейшем в прототипе "Анализ"',
    );
  } finally {
    isImporting.value = false;
  }
}
</script>

<template>
  <div class="import-export-page">
    <n-tabs type="line" animated>
      <n-tab-pane name="import" tab="Импорт">
        <div class="check-group">
          <n-checkbox v-model:checked="importUsers">Пользователи</n-checkbox>
          <div class="check-row">
            <n-checkbox v-model:checked="importOrders">Заказы</n-checkbox>
            <n-upload v-model:file-list="importFileList" :max="1" accept=".json,.csv" :show-file-list="false">
              <n-button size="small" secondary>
                {{
                  importFileList.length
                    ? importFileList[0].name
                    : 'Выбрать файл'
                }}
              </n-button>
            </n-upload>
          </div>
        </div>
        <n-button type="primary" round :loading="isImporting" class="action-btn" @click="handleImport">
          Импорт
        </n-button>
      </n-tab-pane>

      <n-tab-pane name="export" tab="Экспорт">
        <div class="check-group">
          <n-checkbox v-model:checked="exportUsers">Пользователи</n-checkbox>
          <n-checkbox v-model:checked="exportOrders">Заказы</n-checkbox>
          <n-checkbox v-model:checked="exportAnalytics">Аналитика</n-checkbox>
        </div>
        <n-button type="primary" round :loading="isExporting" class="action-btn" @click="handleExport">
          Экспорт
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped lang="scss">
.check-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 32px;
}

.check-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-btn {
  height: 52px;
  min-width: 160px;
  font-size: 15px;
  font-weight: 600;
}
</style>
