import {RouteRecordRaw} from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    name: 'Sign',
    path: '/sign',
    redirect: '/sign/in',
    component: () => import('../packages/sign/index.vue'),
    children: [
      {name: 'Sign In', path: 'in', component: () => import('../packages/sign/in/index.vue')},
      {name: 'Sign Up', path: 'up', component: () => import('../packages/sign/up/index.vue')},
    ],
  }, {
    path: '/',
    name: 'Home App',
    redirect: '/home',
    component: () => import('@home/index.vue'),
    children: [
      {name: 'Home', path: 'home', component: () => import('@home/Home/index.vue')}, // 首页
      {name: 'Article', path: 'article/:id', component: () => import('@home/Article/index.vue')}, // 文章
      {name: 'Archivist', path: 'archivist', component: () => import('@home/Archivist/index.vue')}, // 归档
      {name: 'Category', path: 'category/:keys', component: () => import('@home/Category/index.vue')}, // 分类
      {name: 'ErrorFound', path: 'errorFound', component: () => import('../packages/error/index.vue')},
    ],
  }, {
    name: 'Admin App',
    path: '/admin',
    redirect: '/admin/home',
    component: () => import('@admin/index.vue'),
    children: [
      {name: 'home', path: 'home', component: () => import('@admin/Home/index.vue')},
      {name: 'ErrorFound', path: 'errorFound', component: () => import('../packages/error/index.vue')},
    ],
  },
  {name: 'ErrorRedirect', path: '/:chapters+', component: () => import('../packages/error/redirect.vue')}, // 重定向错误页面
];
