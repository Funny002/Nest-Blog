<template>
  Home
  <div ref="testRef"></div>
  <el-button @click="onGetFile">获取图片</el-button>
</template>

<script lang="ts">export default { name: 'Home' };</script>
<script lang="ts" setup>
import { getFile, FileToBase64, toImage, base64ToFile } from '@utils/file';
import { ref } from 'vue';

const testRef = ref<HTMLElement>();

function onGetFile() {
  getFile().then(file => {
    appendChildImage(file);
    FileToBase64(file).then(base64 => {
      appendChildImage(base64ToFile('text', base64));
    });
  });
}

function appendChildImage(file: File) {
  toImage(file).then(img => {
    testRef.value.appendChild(img);
  });
}
</script>
