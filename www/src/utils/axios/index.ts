import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource, CreateAxiosDefaults} from 'axios';
import {AxiosTools, AxiosToolsConfig} from './tools';
import {UsersStore} from '@store/Users';
import {App} from 'vue';

export interface AxiosConfig extends AxiosToolsConfig {
  cancelKeys: string;
  headers: any;
}

export type AxiosRequest = AxiosRequestConfig & AxiosConfig

export class Axios {
  public readonly axios: AxiosInstance;
  public readonly request: AxiosTools;
  public readonly response: AxiosTools;
  public readonly manage: Map<string, CancelTokenSource>;
  private readonly handleRequest: ((conf: AxiosRequest) => Promise<AxiosRequest>) | undefined;

  constructor(options?: CreateAxiosDefaults, request?: (conf: AxiosRequest) => Promise<AxiosRequest>) {
    this.manage = new Map();
    this.handleRequest = request;
    //
    this.axios = axios.create({...(options || {}), timeout: 3000, headers: {'content-type': 'application/json'}});
    this.request = new AxiosTools(this.axios, 'request', this.requestFulfilled.bind(this), this.requestRejected.bind(this));
    this.response = new AxiosTools(this.axios, 'response', this.responseFulfilled.bind(this), this.responseRejected.bind(this));
  }

  private async requestFulfilled(config: AxiosRequest) {
    config.cancelKeys = config.cancelKeys || Date.now().toString();
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    this.manage.set(config.cancelKeys, source);

    config.__retry_max = config.__retry_max || 3;
    config.__retry_time = config.__retry_time || 500;
    config.__retry_count = config.__retry_count || 1;

    if (!config.params) config.params = {};

    const accessToken = UsersStore().accessToken;
    if (accessToken) config.headers['Authorization'] = 'token ' + accessToken;

    return (this.handleRequest && await this.handleRequest(config)) || config;
  }

  private requestRejected(error: AxiosError & { config: AxiosConfig }) {
    this.manage.delete(error.config.cancelKeys);
    return Promise.reject(error);
  }

  private responseFulfilled(response: AxiosResponse & { config: AxiosConfig }) {
    this.manage.delete(response.config.cancelKeys);
    return response;
  }

  private responseRejected(error: AxiosError & { config: AxiosConfig }) {
    const {config, response} = error;
    if (!config) return Promise.reject(error);
    this.manage.delete(config.cancelKeys);

    let retryState = Boolean(response === undefined || response.status === 408 || response.status === 500);
    if (!retryState) return Promise.reject(error);

    let {__retry_count, __retry_time, __retry_max} = config;
    __retry_count = isNaN(__retry_count) ? 1 : __retry_count;
    __retry_time = isNaN(__retry_time) ? 500 : __retry_time;
    __retry_max = isNaN(__retry_max) ? 3 : __retry_max;

    retryState = Boolean(__retry_count && __retry_max && __retry_count <= __retry_max);
    if (!retryState) return Promise.reject(error);

    error.config.__retry_count = __retry_count + 1;
    const retryFunc = new Promise(success => setTimeout(() => success(true), __retry_time));
    return retryFunc.then(() => this.axios(error.config));
  }

  public isCancel(error: AxiosError) {
    return axios.isCancel(error);
  }

  public cancel(keys: string) {
    const source = this.manage.get(keys);
    if (!source) return false;
    source.cancel('手动取消操作');
    return this.manage.delete(keys);
  }

  public cancelAll() {
    for (const source of this.manage.values()) {
      source.cancel('手动取消操作');
    }

    this.manage.clear();
  }
}

export const defaultAxios = new Axios();

export function useAxios(app: App<Element>) {
  app.config.globalProperties.$axios = defaultAxios.axios;
}

export default defaultAxios.axios;
