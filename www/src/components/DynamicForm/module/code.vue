<template>
  <modules-input class="dynamicForm-code" v-bind="$attrs">
    <template #append>
      <el-button class="dynamicForm-code__button" type="primary" link @click.stop="onClick">{{ props.text }}</el-button>
    </template>
  </modules-input>
</template>

<script lang="ts">export default { name: 'DynamicForm-Text', inheritAttrs: false };</script>
<script lang="ts" setup>
import ModulesInput from './input.vue';

const props = withDefaults(defineProps<{ text?: string; click?: Function; }>(), {
  text: 'ButtonText',
});

const onClick = (event: Event) => props?.click(event);
</script>

<style lang="scss" scoped>
.dynamicForm-code {
  .dynamicForm-code__button {
    height: 100%;
    padding: 0 10px;
  }
}
</style>
