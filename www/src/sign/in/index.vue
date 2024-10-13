<template>
  <div id="SignBox" class="signBox">
    <h2 class="signBox-title">Sign In</h2>
    <div class="signBox-content">
      <div class="">
      </div>
      <el-divider class="signBox-divider" direction="vertical"/>
      <dynamic-form :fields="data.fields" v-model="data.form" @changeItem="onFormChangeItem" style="margin: 0 16px; width: 240px;">
        <template #button>
          <el-button type="primary" style="width: 100%;">Login</el-button>
          <div style="margin-top: 16px;">
            <el-button size="small" type="primary" link @click="() => router.push('/sign/up')">Go Register</el-button>
          </div>
        </template>
      </dynamic-form>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'Sign In' };</script>
<script setup lang="ts">
import { DynamicForm } from '@module/DynamicForm';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const router = useRouter();
const data = reactive({
  form: {},
  fields: [
    { field: 'text', prop: 'user', placeholder: 'User/Email' },
    { field: 'password', prop: 'pass', placeholder: 'Password' },
    { slot: 'button' },
  ],
});

function onFormChangeItem(prop: string, value: any) {
  console.log('onFormChangeItem ->', prop, value);
}
</script>
