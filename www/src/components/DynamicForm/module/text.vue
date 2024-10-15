<template>
  <modules-input class="dynamicForm-text" v-bind="$attrs"/>
</template>

<script lang="ts">export default { name: 'DynamicForm-Text', inheritAttrs: false };</script>
<script lang="ts" setup>
import ModulesInput from './input.vue';
</script>
