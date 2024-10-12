<template>
  <el-form-item v-bind="props.formItemProps">
    {{ $attrs }}
  </el-form-item>
</template>

<script lang="ts">export default { name: 'DynamicFormItem' };</script>
<script setup lang="ts">
import type { ElFormItem } from 'element-plus';

interface Props {
  formItemProps?: ElFormItem;
}

const props = withDefaults(defineProps<Props>(), {
  //
});
</script>
