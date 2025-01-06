<template>
  <div class="sign-header">
    <el-button link class="sign-header-logo" @click.stop="() => router.push('/')">
      <img style="width: 24px; display: inline-block;" src="/vite.svg" alt="logo"/>
      <span style="padding-left: 4px; font-weight: bold;">Nest Blog</span>
    </el-button>
  </div>
  <div class="sign-content">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </div>
  <div class="sign-footer" v-show="false">sign-footer</div>
</template>

<script lang="ts">export default {name: 'Sign'};</script>
<script lang="ts" setup>
import { onBeforeMount, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const App = document.querySelector('#app') as HTMLElement;

onBeforeMount(() => App.classList.add('sign'));
onUnmounted(() => App.classList.remove('sign'));
</script>

<style lang="scss" src="./style.scss"></style>
