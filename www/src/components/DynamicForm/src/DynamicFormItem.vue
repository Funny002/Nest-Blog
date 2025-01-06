<template>
  <template v-if="components.slotName">
    <component v-if="components.slot" :is="components.slot" :fields="props"/>
  </template>
  <template v-else>
    <component v-if="components.field" :is="components.field" v-bind="props">
      <template v-if="(children || []).length">
        <dynamic-form-item v-for="child in children" :fields="child"/>
      </template>
    </component>
  </template>
</template>

<script lang="ts">export default {name: 'DynamicFormItem'};</script>
<script setup lang="ts">
import { computed, inject, shallowRef } from 'vue';
import type { Ref } from 'vue';

const props = withDefaults(defineProps<{ fields?: Record<string, any>; }>(), {});
const $slots = inject<Ref<Record<string, any>>>('$slots', shallowRef({}));
const $modules = inject<Ref<Record<string, any>>>('$modules', shallowRef({}));

const children = computed(() => props.fields?.children || []);
const components = computed(() => {
  const {slot, field} = (props.fields || {slot: '', field: ''}) as { slot: string; field: string };
  return {
    slotName: slot,
    fieldName: field,
    slot: slot ? $slots.value[slot] || null : null,
    field: field ? $modules.value[field] || null : null,
  };
});
</script>
