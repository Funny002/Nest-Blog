<template>
  <div id="SignBox" class="signBox">
    <h2 class="signBox-title">Sign In</h2>
    <div class="signBox-content">
      <div class="">
        <el-input placeholder="User/Email"></el-input>
        <el-input type="password" placeholder="Pass" clearable></el-input>
        <el-button type="primary">Sign</el-button>
      </div>
      <el-divider class="signBox-divider" direction="vertical"/>
      <dynamic-form :fields="data.fields" style="width: 300px;"/>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'Sign In' };</script>
<script setup lang="ts">
import { reactive } from 'vue';
import { DynamicForm } from '@module/DynamicForm';

const data = reactive({
  form: {},
  fields: [
    { input: 'input', prop: 'user', placeholder: 'User/Email' },
    { input: 'password', prop: 'pass', placeholder: 'Pass' },
  ],
});
</script>
