<template>
  <el-form-item>
    <el-input/>
  </el-form-item>
</template>

<script lang="ts">export default { name: 'DynamicForm-Text', inheritAttrs: false };</script>
<script lang="ts" setup>
import type { ElFormItem } from 'element-plus';

interface Props {
  formItem: ElFormItem;
}
</script>
