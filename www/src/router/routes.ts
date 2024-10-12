import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'App',
  redirect: '/home',
  children: [
    { name: 'Home', path: 'home', component: () => import('@home/index.vue') }, // 首页
    {
      name: 'Sign',
      path: 'sign',
      redirect: '/sign/in',
      component: () => import('../sign/index.vue'),
      children: [
        { name: 'Sign In', path: 'in', component: () => import('../sign/in/index.vue') },
        { name: 'Sign Up', path: 'up', component: () => import('../sign/up/index.vue') },
      ],
    },
  ],
}];
