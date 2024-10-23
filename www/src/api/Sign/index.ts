import { axios } from '@utils/axios';

const baseApi = window.__Config__.baseApi + 'sign/';
export const login = (user: string, pass: string) => axios.post(baseApi + 'login', { user, pass });
export const register = (email: string, pass: string, code: string) => axios.post(baseApi + 'register', { email, pass, code });
