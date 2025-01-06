/// <reference types="vite/client" />
export {};

declare global {
  import { BaseConfig } from './main/config.ts';

  type VarStorageEvent = CustomEvent<{ type: 'set' | 'remove'; prefix: string; key: string; value?: any; } | { type: 'clear', prefix: string; keys: string[] }>

  type Fields = FieldItem | FieldSlot;
  type FieldSlot = { slot: string; } & FieldBase;
  type FieldItem = { field: string; } & FieldBase;

  interface FieldBase {
    type?: string;
    children: Fields[];
    colProps?: Record<string, any>;
  }

  interface UserInfo {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    token: string;
    avatar: string;
  }

  interface Window {
    __CONFIG__: BaseConfig;
  }
}
