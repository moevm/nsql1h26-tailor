<script setup lang="ts">
import { exportApi } from '@/api/export';
import { importApi } from '@/api/import';
import {
  NButton,
  NRadio,
  NRadioGroup,
  NTabPane,
  NTabs,
  NUpload,
  useMessage,
} from 'naive-ui';
import type { UploadFileInfo } from 'naive-ui';
import { ref } from 'vue';

const message = useMessage();

const exportType = ref<'users' | 'orders'>('users');
const isExporting = ref(false);

const importType = ref<'users' | 'orders'>('users');
const importFileList = ref<UploadFileInfo[]>([]);
const isImporting = ref(false);

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function handleExport() {
  isExporting.value = true;
  try {
    const isUsers = exportType.value === 'users';
    const res = await exportApi.exportFile({
      users: isUsers || undefined,
      orders: !isUsers || undefined,
    });
    downloadBlob(res.data, isUsers ? 'users.csv' : 'orders.csv');
    message.success('Экспорт выполнен');
  } catch {
    message.error('Ошибка при экспорте');
  } finally {
    isExporting.value = false;
  }
}

async function handleImport() {
  if (!importFileList.value.length) {
    message.warning('Выберите файл для импорта');
    return;
  }
  const rawFile = importFileList.value[0].file;
  if (!rawFile) {
    message.warning('Не удалось загрузить файл');
    return;
  }
  isImporting.value = true;
  try {
    const isUsers = importType.value === 'users';
    await importApi.importFile(rawFile, {
      users: isUsers || undefined,
      orders: !isUsers || undefined,
    });
    message.success('Данные успешно импортированы');
    importFileList.value = [];
  } catch {
    message.error('Ошибка при импорте');
  } finally {
    isImporting.value = false;
  }
}
</script>

<template>
  <div class="import-export-page">
    <n-tabs type="line" animated>
      <n-tab-pane name="import" tab="Импорт">
        <n-radio-group v-model:value="importType" class="radio-group">
          <n-radio value="users">Пользователи</n-radio>
          <n-radio value="orders">Заказы</n-radio>
          <n-upload
            v-model:file-list="importFileList"
            :max="1"
            accept=".csv"
            :show-file-list="false"
          >
            <n-button size="small" secondary>
              {{
                importFileList.length ? importFileList[0].name : 'Выбрать файл'
              }}
            </n-button>
          </n-upload>
        </n-radio-group>
        <n-button
          type="primary"
          round
          :loading="isImporting"
          class="action-btn"
          @click="handleImport"
        >
          Импорт
        </n-button>
      </n-tab-pane>

      <n-tab-pane name="export" tab="Экспорт">
        <n-radio-group v-model:value="exportType" class="radio-group">
          <n-radio value="users">Пользователи</n-radio>
          <n-radio value="orders">Заказы</n-radio>
        </n-radio-group>
        <n-button
          type="primary"
          round
          :loading="isExporting"
          class="action-btn"
          @click="handleExport"
        >
          Экспорт
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped lang="scss">
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 32px;
}

.action-btn {
  height: 52px;
  min-width: 160px;
  font-size: 15px;
  font-weight: 600;
}
</style>
