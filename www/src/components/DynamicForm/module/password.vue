<template>
  <el-form-item>
    <el-input type="password" show-password/>
  </el-form-item>
</template>

<script lang="ts">export default { name: 'DynamicForm-PassWord', inheritAttrs: false };</script>
<script lang="ts" setup>
import type { ElFormItem } from 'element-plus';
</script>
