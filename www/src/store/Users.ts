import { defineStore } from 'pinia';

export const UserStoreName = '__user_store__';

export interface UserStoreOptions {
  info?: UserInfo;
  loginStatus: boolean;
  token?: {
    access_token: string;
    refresh_token: string;
    access_expire: number;
    refresh_expire: number;
  };
}

export const UsersStore = defineStore(UserStoreName, {
  state: ((): UserStoreOptions => {
    return {
      loginStatus: false,
    };
  }),
  getters: {},
  actions: {
    getToken(this: any, type: 'access' | 'refresh'): string {
      return this.token?.[`${ type }_token`] || '';
    },
    isExpire(this: any, type: 'access' | 'refresh'): boolean {
      if (!this.getToken(type)) return true;
      return Date.now > (this.token?.[`${ type }_expire`] || 0);
    },
    async register(email: string, pass: string, code: string) {},
    async login(user: string, pass: string) {},
    async refreshToken() {},
    async isLogin() {},
    async logout() {},
  },
});
