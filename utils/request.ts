import { Notification } from '@douyinfe/semi-ui';

import { Request } from './axios';

export const req = new Request('/', {
  onSuccess: (data: any) => {
    return Promise.resolve(data);
  },
  onError: (err: any) => {
    console.log({ err });
    const errMsg =
      err?.response?.statusText || err?.response?.data?.message || '未知错误';

    Notification.error({
      content: errMsg,
      duration: 5,
    });
    return Promise.reject(errMsg);
  },
});
