<template>
  <div class="home">
    <div class="home-header">
      <div class="home-header-item" v-for="item in data.list">
        <span class="home-header-value">{{ item.value }}</span>
        <span class="home-header-divider"></span>
        <span class="home-header-label">{{ item.label }}</span>
      </div>
    </div>
    <el-divider style="margin: 16px 0;"/>
    <div class="home-article">
      <template v-for="article in data.articles">
        <article-item v-bind="article"/>
      </template>
    </div>
    <el-divider style="margin: 16px 0;"/>
    <div style="padding: 0 16px;">
      <el-pagination size="small" background layout="prev, pager, next" :total="1000"/>
    </div>
  </div>
</template>

<script lang="ts">export default {name: 'Home'};</script>
<script setup lang="ts">
import {reactive} from 'vue';
import ArticleItem from '../components/Article';

const data = reactive({
  list: [
    {name: '', label: '文章', value: 100},
    {name: '', label: '评论', value: 2180},
    {name: '', label: '分类', value: 4},
    {name: '', label: '归档', value: 40},
  ],
  articles: [
    {title: 'test', image: '/headerBackgroundImg.png'},
    {title: 'test', image: '/headerBackgroundImg.png'},
    {title: 'test', image: '/headerBackgroundImg.png'},
  ],
});
</script>
<style lang="scss" src="../style/home.scss"></style>
