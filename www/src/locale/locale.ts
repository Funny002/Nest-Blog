import {useThemeStore} from '../sotre/theme.ts';
import {getRouterLocale} from '../router';
import storage from '@utils/storage';
import {createI18n} from 'vue-i18n';

const localeMessages = (function (modules: Record<string, any>) {
  return Object.keys(modules).reduce(function (prev: Record<string, any>, curr: string) {
    const keys = curr.toLowerCase().split('packages')[1];
    return Object.assign(prev, {[keys]: modules[curr]});
  }, {});
})(import.meta.glob('../packages/**/**/*.locale.json', {query: 'raw', import: 'default'}));

export const i18n = createI18n({
  locale: storage.get('locale') || 'zh',
  fallbackLocale: 'zh',
});

export async function getPathMessage(path: string) {
  const models = localeMessages[path];
  if (models) {
    try {
      const result = await models();
      return JSON.parse(result);
    } catch (e: any) {
      console.warn(`[${path}] ${e.message}`);
    }
  } else {
    console.warn(`[${path}] not found`);
  }
  return {};
}

export async function useDefaultLocale(packages: string, locale?: string) {
  locale = (locale || i18n.global.locale) as string;
  if (!('is_default' in i18n.global)) {
    const message = await getPathMessage(`/${packages}/locale/${locale}.locale.json`);
    i18n.global.setLocaleMessage(locale, message);
    Object.defineProperty(i18n.global, 'is_default', {value: true});
  }
}

export async function loadLocaleMessages(path: string) {
  if (path[path.length - 1] === '/') {
    path = path.slice(0, -1);
  }
  let packages = 'admin';
  if (path !== '/admin') {
    path = '/home' + path;
    packages = 'home';
  }
  //
  await useDefaultLocale(packages);
  const locale = i18n.global.locale;
  const storage_key = `locale:${locale}:${path}`;
  let messages = storage.get(storage_key);
  if (!messages) {
    const reg = new RegExp(`${path}/(locale/)?${locale}.locale.json`);
    const key_list = Object.keys(localeMessages).filter(keys => reg.test(keys));
    for (const key of key_list) {
      const message = await getPathMessage(key);
      messages = Object.assign({}, messages, message);
    }
    storage.set(storage_key, messages, 60 * 60 * 24); // 1day
  }
  // loading locale message
  i18n.global.setLocaleMessage(locale, messages);
}

export async function setLocale(locale: string, theme: boolean = false) {
  storage.set('locale', locale);
  i18n.global.locale = locale;
  await loadLocaleMessages(getRouterLocale());
  if (!theme) await useThemeStore().setLocale(locale);
}
