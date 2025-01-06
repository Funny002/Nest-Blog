import { defineStore } from 'pinia';

interface UserStoreOptions {
  user?: UserInfo;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
}

export const UsersStore = defineStore('user_store', {
  state: (): UserStoreOptions => ({}),
  getters: {
    accessToken: ({token}) => token ? token.accessToken : '',
  },
});
