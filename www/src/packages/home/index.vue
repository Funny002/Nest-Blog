<template>
  <header class="home-header">
    <el-button class="home-header-logo" link @click.stop="() => router.push('/')">
      <img src="/vite.svg" alt="logo"/>
      <span>Nest Blog</span>
    </el-button>
    <span style="margin: 0 auto;"></span>
    <div class="home-header-button">
      <bootstrap-icon name="search"/>
    </div>
    <el-button link style="margin-left: 16px;" @click.stop="() => router.push('/sign')" title="Login">
      <el-avatar :size="30">
        <bootstrap-icon style="font-size: 20px;" name="person-circle"/>
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
  <div class="home-background" :style="{'--header-background': `url('/headerBackgroundImg.png')`}"></div>
  <main class="home-content">
    <el-affix class="home-sideBar-affix" :offset="100" style="width: 140px;">
      <aside class="home-sideBar">
        <template v-for="type in data.list">
          <div class="home-sideBar-list" v-if="(data[type] || []).length">
            <div class="home-sideBar-title">{{ type.toUpperCase() }}</div>
            <div class="home-sideBar-box">
              <template v-for="item in (data[type] || [])">
                <el-button class="home-sideBar-item" text @click.stop="onClick(type, item)">
                  {{ item.label }}
                  <template #icon v-if="item.icon">
                    <bootstrap-icon :name="item.icon"/>
                  </template>
                </el-button>
              </template>
            </div>
          </div>
        </template>
      </aside>
    </el-affix>
    <div class="home-content-body">
      <router-view/>
    </div>
  </main>
  <footer class="home-footer">
    <el-divider style="margin:0;"/>
    <h4 class="home-footer-copyright">© Copyright 2023 By Nest Blog</h4>
  </footer>
</template>

<script lang="ts">export default { name: 'HomeApp' };</script>
<script lang="ts" setup>
import { BootstrapIcon } from '@module/BootstrapIcon';
import { onBeforeMount, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

const router = useRouter();
const App = document.querySelector('#app');

const data = reactive({
  list: ['browse', 'category', 'page'],
  browse: [
    { name: 'home', label: '首页', icon: 'house-fill' },
    { name: 'search', label: '搜索', icon: 'search' },
  ],
  category: [
    { name: '1', label: '分类一', icon: 'list', sort: 0 },
    { name: '2', label: '分类一', icon: 'list', sort: 0 },
    { name: '3', label: '分类一', icon: 'list', sort: 0 },
    { name: '4', label: '分类一', icon: 'list', sort: 0 },
  ],
  page: [
    { name: '1', label: '关于', icon: '' },
  ],
});

function onClick(type: 'browse' | 'category' | 'page', item: Record<string, any>) {
  // router.push(`/category/${ item.name }`);
  console.log(item);
}

onBeforeMount(() => App.classList.add('home'));
onUnmounted(() => App.classList.remove('home'));
</script>

<style lang="scss" src="./style/index.scss"></style>
