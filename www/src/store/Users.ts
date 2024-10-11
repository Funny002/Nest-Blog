import { defineStore } from 'pinia';

export const UserStoreName = '__user_store__';

export interface UserStoreOptions {
}

export const UsersStore = defineStore(UserStoreName, {
  state: ((): UserStoreOptions => {
    return {};
  }),
  actions: {},
  getters: {},
});
