import { defineAsyncComponent } from 'vue';

const modules = import.meta.glob('../module/*.vue', { import: 'default' });

export const Modules = Object.keys(modules).reduce(function (prev, keys) {
  const name = keys.replace(/^\.\.\/module\/([A-z\s\-]+)\.vue$/, '$1');
  if (!name) {
    console.warn(`组件名 "${ keys }" 解析失败。`);
    return prev;
  }
  return Object.assign(prev, { [name]: defineAsyncComponent(modules[keys]) });
}, {});
