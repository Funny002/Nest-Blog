<template>
  <header class="home-header">
    <el-button class="home-header-logo" link @click.stop="() => router.push('/')">
      <img style="width: 24px; display: inline-block;" src="/vite.svg" alt="logo"/>
      <span style="padding-left: 4px; font-weight: bold;">Nest Blog</span>
    </el-button>
    <span style="margin: 0 auto;"></span>
    <el-input class="home-header-search" :prefix-icon="Search"></el-input>
    <el-button link style="margin-left: 16px;" @click.stop="() => router.push('/sign')" title="Login">
      <el-avatar :size="30">
        <el-icon>
          <user-filled/>
        </el-icon>
      </el-avatar>
    </el-button>
    <!--    <el-popover>-->
    <!--      <template #reference>-->
    <!--        <el-button link style="margin-left: 16px;">-->
    <!--          <el-avatar :size="30" src="/vite.svg"></el-avatar>-->
    <!--        </el-button>-->
    <!--      </template>-->
    <!--      <div class="">-->
    <!--        <el-button link>切换用户</el-button>-->
    <!--        <el-button link>退出登录</el-button>-->
    <!--      </div>-->
    <!--    </el-popover>-->
  </header>
  <div class="home-header__background" :style="{'--header-background': `url('/headerBackgroundImg.png')`}"></div>
  <aside class="home-side-bar">
    home-side-bar
  </aside>
  <main class="home-center">
    <router-view/>
    {{ App.clientWidth }}
    {{ App.clientHeight }}
  </main>
</template>

<script lang="ts">export default { name: 'HomeApp' };</script>
<script lang="ts" setup>
import { Search, UserFilled } from '@element-plus/icons-vue';
import { onBeforeMount, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const App = document.querySelector('#app');

onBeforeMount(() => App.classList.add('home'));
onUnmounted(() => App.classList.remove('home'));
</script>

<style lang="scss" src="./style/index.scss"></style>
