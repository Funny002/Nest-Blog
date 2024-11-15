import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async function (to, from, next) {
  document.title = window.__CONFIG__.title;
  console.log(to);
  next();
});

export async function setupRouter(app) {
  app.use(router);
  await router.isReady();
  return app;
}
