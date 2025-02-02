<template>
  <el-form-item class="dynamicForm-input" :class="$attrs.class" v-bind="props.formItem" :prop="props.prop">
    <el-input v-bind="handlerBindProps($attrs)" v-on="props.events" v-model="values" @keydown.enter="onEnter">
      <template v-for="(slots, keys) in Object.assign(props.slots, $slots)" :key="keys" #[keys]="scope">
        <component :is="slots" v-bind="scope"/>
      </template>
    </el-input>
  </el-form-item>
</template>

<script lang="ts">export default {name: 'DynamicForm-Input', inheritAttrs: false};</script>
<script lang="ts" setup>
import { computed, inject, shallowRef } from 'vue';
import { ElFormItem } from 'element-plus';
import { ObjectPick } from '@utils/object';
import type { Ref } from 'vue';

interface Props {
  prop?: string;
  slots?: Record<string, any>;
  formItem?: typeof ElFormItem;
  events?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  slots: () => ({}),
  events: () => ({}),
});

const defaultProps = {type: 'text', clearable: true};
const ElInputProps = ['type',
  'maxlength',
  'minlength',
  'showWordLimit',
  'placeholder',
  'clearable',
  'formatter',
  'parser',
  'showPassword',
  'disabled',
  'size',
  'prefixIcon',
  'suffixIcon',
  'rows',
  'autosize',
  'autocomplete',
  'name',
  'readonly',
  'max',
  'min',
  'step',
  'resize',
  'autofocus',
  'form',
  'tabindex',
  'validateEvent',
  'inputStyle',
  // 辅助属性
  'show-word-limit',
  'show-password',
  'prefix-icon',
  'suffix-icon',
  'validate-event',
  'input-style',
];

const onEnter = (event: Event) => props.events?.enter(event);
const handlerBindProps = (attrs: Record<string, any>) => Object.assign(defaultProps, ObjectPick(attrs, ElInputProps));

const changeItem = inject<Function>('change-item', () => {
});
const modelValue = inject<Ref<Record<string, any>>>('$values', shallowRef({}));
const values = computed({
  get() {
    return props.prop ? modelValue.value[props.prop] : '';
  },
  set(value: any) {
    if (props.prop) {
      changeItem(props.prop, value);
      modelValue.value = Object.assign({}, modelValue.value, {[props.prop]: value});
    }
  },
});
</script>
