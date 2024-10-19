import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'App',
  redirect: '/home',
  component: () => import('@home/index.vue'),
  children: [
    { name: 'Home', path: 'home', component: () => import('@home/Home/index.vue') }, // 首页
    { name: 'Article', path: 'article/:id', component: () => import('@home/Article/index.vue') }, // 文章
    { name: 'Archivist', path: 'archivist', component: () => import('@home/Archivist/index.vue') }, // 归档
    { name: 'Category', path: 'category/:keys', component: () => import('@home/Category/index.vue') }, // 分类
  ],
}, {
  name: 'Sign',
  path: '/sign',
  redirect: '/sign/in',
  component: () => import('../sign/index.vue'),
  children: [
    { name: 'Sign In', path: 'in', component: () => import('../sign/in/index.vue') },
    { name: 'Sign Up', path: 'up', component: () => import('../sign/up/index.vue') },
  ],
}];
