<template>
  <el-config-provider v-bind="elementProps">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts">export default {name: 'Nest Blog'};</script>

<script lang="ts" setup>
import {useThemeStore} from '../sotre/theme.ts';
import {storeToRefs} from 'pinia';
import {onBeforeMount} from 'vue';

const themeStore = useThemeStore();
const {elementProps} = storeToRefs(themeStore);
//
onBeforeMount(() => {
  themeStore.setLocale('zh');
});
</script>

<style lang="sass" src="./style.scss"></style>
