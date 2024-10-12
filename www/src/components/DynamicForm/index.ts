import { defineAsyncComponent } from 'vue';

export const DynamicForm = defineAsyncComponent(() => import('./src/DynamicForm.vue')); // DynamicForm

export default DynamicForm;
