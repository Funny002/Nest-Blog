/// <reference types="vite/client" />

declare type VarStorageEvent = CustomEvent<{ type: 'set' | 'remove'; prefix: string; key: string; value?: any; } | { type: 'clear', prefix: string; keys: string[] }>