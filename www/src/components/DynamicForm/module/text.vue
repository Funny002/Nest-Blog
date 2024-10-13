<template>
  <modules-input v-bind="$attrs"/>
</template>

<script lang="ts">export default { name: 'DynamicForm-Text', inheritAttrs: false };</script>
<script lang="ts" setup>
import ModulesInput from './input.vue';
</script>
