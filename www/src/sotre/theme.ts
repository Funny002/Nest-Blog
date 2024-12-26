import {i18n, setLocale} from '../locale/locale.ts';
import {defineStore} from 'pinia';

const localeMap: Record<string, string> = {
  'zh-cn': 'zh',
};

const elementLocale = (function (modules: Record<string, any>) {
  return Object.keys(modules).reduce(function (prev: Record<string, any>, curr: string) {
    const keys = curr.toLowerCase().split('/').pop() as string;
    const key = keys.split('.')[0];
    return Object.assign(prev, {[localeMap[key] || key]: modules[curr]});
  }, {});
})(import.meta.glob([
  '/node_modules/element-plus/dist/locale/*.mjs',
  '!/node_modules/element-plus/dist/locale/*.min.mjs',
], {import: 'default'}));

interface ThemeStoreProps {
  locale: string;
  element: {
    locale?: any
    valueOnClear: null;
    button: {
      autoInsertSpace: boolean;
    };
    message: {
      duration: number;
      grouping: boolean;
    };
  };
}

export const useThemeStore = defineStore('theme_store', {
  state: (): ThemeStoreProps => {
    return {
      locale: i18n.global.locale as string,
      element: {
        locale: undefined,
        valueOnClear: null,
        button: {
          autoInsertSpace: true,
        },
        message: {
          duration: 3,
          grouping: true,
        },
      },
    };
  },
  getters: {
    elementProps: ({element}) => element,
  },
  actions: {
    async setLocale(locale: string) {
      this.locale = locale;
      await setLocale(locale, true);
      const models = elementLocale[locale];
      if (models) this.element.locale = await models();
    },
  },
});
