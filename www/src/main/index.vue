<template>
  <el-config-provider v-bind="ConfigProvider">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts">export default { name: 'Main' };</script>
<script setup lang="ts">
import { reactive } from 'vue';
import zhCN from 'element-plus/dist/locale/zh-cn.mjs';

const ConfigProvider = reactive({
  locale: zhCN,
  // size: 'small',
  valueOnClear: null,
  button: {
    autoInsertSpace: true,
  },
  message: {
    duration: 3,
    grouping: true,
  },
});
</script>

<style lang="scss" src="./style.scss"/>
