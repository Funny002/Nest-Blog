<template>
  <modules-input class="dynamicForm-password" v-bind="$attrs" type="password" show-password/>
</template>

<script lang="ts">export default { name: 'DynamicForm-Password', inheritAttrs: false };</script>
<script lang="ts" setup>
import ModulesInput from './input.vue';
</script>
