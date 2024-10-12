/// <reference types="vite/client" />

type VarStorageEvent = CustomEvent<{ type: 'set' | 'remove'; prefix: string; key: string; value?: any; } | { type: 'clear', prefix: string; keys: string[] }>

interface Fields {

}
