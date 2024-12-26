/// <reference types="vite/client" />
export {};


declare global {
  import {BaseConfig} from './main/config.ts';

  interface Window {
    __CONFIG__: BaseConfig;
  }
}
