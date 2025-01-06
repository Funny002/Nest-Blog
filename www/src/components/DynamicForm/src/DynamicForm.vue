<template>
  <el-form class="dynamicForm" v-bind="props.formProps" :model="props.modelValue">
    <el-row v-bind="props.rowProps">
      <template v-for="fields in props.fields">
        <el-col v-bind="fields.colProps || {}">
          <dynamic-form-item :fields="fields"/>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">export default {name: 'DynamicForm'};</script>
<script setup lang="ts">
import { computed, getCurrentInstance, provide } from 'vue';
import type { ComponentInternalInstance } from 'vue';
import DynamicFormItem from './DynamicFormItem.vue';
import { ElForm, ElRow } from 'element-plus';
import { Modules } from './modules';

interface Props {
  rowProps?: typeof ElRow;
  formProps?: typeof ElForm;
  modules?: Record<string, any>;
  modelValue?: Record<string, any>;
  fields?: Array<Record<string, any>>;
}

const {slots} = getCurrentInstance() as ComponentInternalInstance;
const props = withDefaults(defineProps<Props>(), {
  fields: () => ([]),
  modules: () => ({}),
});

provide('$slots', computed(() => slots));
provide('$modules', computed(() => Object.assign({}, Modules, props.modules)));

const emits = defineEmits(['update:modelValue', 'change', 'changeItem']);

provide('$values', computed({
  get() {
    return props.modelValue;
  },
  set(value: Record<string, any>) {
    emits('update:modelValue', value);
    emits('change', value);
  },
}));

provide('change-item', function (...args: any[]) {
  emits('changeItem', ...args);
});
</script>

<style lang="scss" src="./style.scss"></style>
