import { default as axios } from 'axios';
import { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

import { download as downloadFile } from './file';
import { queryParams } from './format';
import { isFunction } from './type';

export interface RequestOptions {
  url: string;
  method: Method;
  data?: any;
  headers?: any;
}

export interface RequestPayload {
  url: string;
  params?: any;
  headers?: any;
  responseType?: string;
  onDownloadProgress?: Function;
  onUploadProgress?: Function;
}

export class Request {
  AXIOS_INSTANCE: AxiosInstance;

  customizeHeader: Function | undefined;
  handleError: Function;
  handleResolve: Function;

  // 不需要设置头部的接口； 默认返回一个空对象
  constructor(
    baseURL: string,
    handelers: {
      onSuccess: Function;
      onError: Function;
      customizeHeader?: Function;
    },
    options?: AxiosRequestConfig,
  ) {
    this.AXIOS_INSTANCE = axios.create(
      Object.assign(
        // 默认配置
        {
          baseURL,
          timeout: 60000, // 默认一分钟超时
          withCredentials: true, // withCredentials 未配置时，默认为 true
        },
        // 自定义配置
        options,
      ),
    );

    this.customizeHeader = handelers?.customizeHeader; // 针对某一后台的通用「 header 」处理
    this.handleResolve = handelers?.onSuccess; // 针对某一后台的通用「 数据结构 」处理
    this.handleError = handelers?.onError; // 针对某一后台的通用「 错误信息 」处理
  }

  async request<T>(options: RequestOptions) {
    console.log(options);
    if (
      options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'PATCH' ||
      options.method === 'DELETE'
    ) {
      // FormData
      if (options.data instanceof FormData) {
        options.headers = Object.assign({}, options.headers, {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data; chartset=UTF-8',
        });
      }
      // application/json
      else {
        options.headers = Object.assign({}, options.headers, {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        });
        options.data = JSON.stringify(options.data);
      }
    }

    // 接口的固定 header
    if (isFunction(this.customizeHeader)) {
      // @ts-ignore
      const customizeHeaders = await this.customizeHeader();
      options.headers = Object.assign({}, customizeHeaders, options.headers);
    }

    try {
      const response = await this.AXIOS_INSTANCE.request(options);
      return this.handleResolve(response.data as T);
    } catch (err) {
      return this.handleError(err);
    }
  }

  // 通过路径携带信息
  requestByQuery<T>(payload: RequestPayload, method?: Method) {
    const { url, params, headers } = payload;

    return this.request<T>({
      url: `${url}${queryParams(params)}`,
      method: method || 'GET',
      headers,
    });
  }

  // 通过 body 携带信息
  requestByBody<T>(payload: RequestPayload, method: Method) {
    const { url, params, headers, ...rest } = payload;

    return this.request<T>({
      url: `${url}`,
      method,
      headers,
      data: params,
      ...rest,
    });
  }

  get<T>(url: string, params?: any, headers?: any): Promise<T> | void {
    return this.requestByQuery<T>({ url, params, headers }, 'GET');
  }

  // delete 为保留字
  destroy<T>(url: string, params?: any, headers?: any): Promise<T> | void {
    return this.requestByBody<T>({ url, params, headers }, 'DELETE');
  }

  patch<T>(url: string, params?: any, headers?: any): Promise<T> | void {
    return this.requestByBody<T>({ url, params, headers }, 'PATCH');
  }

  post<T>(url: string, params?: any, headers?: any): Promise<T> | void {
    return this.requestByBody<T>({ url, params, headers }, 'POST');
  }

  put<T>(url: string, params?: any, headers?: any): Promise<T> | void {
    return this.requestByBody<T>({ url, params, headers }, 'PUT');
  }

  // 当后端直接返回二进制文件时，触发下载
  download(
    url: string,
    type: string,
    filename: string,
    params?: any,
    onDownloadProgress?: Function,
  ): Promise<void> | void {
    return new Promise(async (resolve, reject) => {
      try {
        const response: BlobPart = await this.requestByQuery<BlobPart>({
          url,
          params: params || {},
          headers: {
            'Content-Type': 'application/json; application/octet-stream',
          },
          responseType: 'arraybuffer',
          onDownloadProgress, // {e : {loaded, total}}
        });
        downloadFile(response, type, filename);
        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  // 上传
  upload<T>(
    url: string,
    params: any,
    onUploadProgress?: Function,
    method?: Method,
  ): Promise<void> | void {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.requestByBody(
          {
            url,
            params,
            headers: {
              'Content-Type': 'multipart/form-data; chartset=UTF-8',
            },
            onUploadProgress,
          },
          method || 'PUT',
        );
        resolve(response);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}
