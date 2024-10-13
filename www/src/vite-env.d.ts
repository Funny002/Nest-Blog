/// <reference types="vite/client" />
type VarStorageEvent = CustomEvent<{ type: 'set' | 'remove'; prefix: string; key: string; value?: any; } | { type: 'clear', prefix: string; keys: string[] }>

type Fields = FieldItem | FieldSlot;
type FieldSlot = { slot: string; } & FieldBase;
type FieldItem = { field: string; } & FieldBase;

interface FieldBase {
  type?: string;
  children: Fields[];
  colProps?: Record<string, any>;
}
