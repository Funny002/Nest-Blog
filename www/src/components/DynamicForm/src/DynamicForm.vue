<template>
  <el-form v-bind="props.formProps">
    <el-row v-bind="props.rowProps">
      <template v-for="fields in props.fields">
        <el-col v-bind="fields.colProps || {}">
          <dynamic-form-item v-bind="fields"/>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">export default { name: 'DynamicForm' };</script>
<script setup lang="ts">
import DynamicFormItem from './DynamicFormItem.vue';
import type { ElForm, ElRow } from 'element-plus';

interface Props {
  rowProps: ElRow,
  formProps: ElForm,
  fields?: Array<Fields>,
  modelValue?: Record<string, any>,
}

const props = withDefaults(defineProps<Props>(), {
  fields: () => ([]),
});
</script>

<style lang="scss" src="./style.scss"></style>
