<template>
  <template v-if="props.slot">
    <component v-if="slotComponent" :is="slotComponent" :fields="props"/>
  </template>
  <template v-else>
    <component v-if="modelComponent" :is="modelComponent" v-bind="props">
      <template v-if="(props.children || []).length">
        <dynamic-form-item v-for="child in props.children" :fields="child"/>
      </template>
    </component>
  </template>
</template>

<script lang="ts">export default { name: 'DynamicFormItem' };</script>
<script setup lang="ts">
import { computed, inject, Ref, shallowRef } from 'vue';

const { fields: props } = defineProps<{ fields: Fields; }>()

const $slots = inject<Ref<Record<string, any>>>('$slots', shallowRef({}));
const $modules = inject<Ref<Record<string, any>>>('$modules', shallowRef({}));

const slotComponent = computed(() => props.slot ? $slots.value[props.slot] || null : null);
const modelComponent = computed(() => props.field ? $modules.value[props.field] || null : null);
</script>
