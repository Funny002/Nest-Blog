/// <reference types="vite/client" />
interface BaseConfigOption {
  host: string;
  port: number;
  base: string;
  baseApi: string;
  tags: undefined | string;
  scheme: 'http' | 'https' | boolean;
}

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
  avatar: string;
  email: string;
  phone: string;
  role: string;
  token: string;
}

declare global {
  interface Window {
    __CONFIG__: BaseConfigOption & { scheme: 'http' | 'https' };
  }
}
