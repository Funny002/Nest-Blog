import {createRouter, createWebHistory, useRoute} from 'vue-router';
import {loadLocaleMessages} from '../locale/locale.ts';
import {routes} from './routes';
import {App} from 'vue';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function getRouterLocale() {
  const to = useRoute();
  return (to.meta.i18n as string) || to.fullPath;
}

router.beforeEach(async function (to, _, next) {
  await loadLocaleMessages(getRouterLocale());
  document.title = window.__CONFIG__.title;
  console.log(to.fullPath);
  next();
});

export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
  return app;
}
