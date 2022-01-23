import { Notification } from '@douyinfe/semi-ui';
import { queryParams } from '@utils/format';
import { useMemo } from 'react';
import useSWR, { SWRResponse } from 'swr';
import type { KeyedMutator } from 'swr';
import { notNil } from '@utils/type';

export interface SwrData<T> {
  data?: T;
  error?: any;
  loading?: boolean;
  hasError?: boolean;
  reload: KeyedMutator<T>;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function useApi<T>(
  path: string,
  params?: any,
  options?: { shouldFetch?: boolean },
): SwrData<T> {
  const key = useMemo(() => {
    // 优先遵循配置，未配置时默认允许
    let shouldFetch =
      options && 'shouldFetch' in options ? options.shouldFetch : true;

    return shouldFetch ? `${path}${queryParams(params)}` : null;
  }, [options, path, params]);

  if (process.env.NODE_ENV === 'development') console.log('fetching', key);

  const { data, error, mutate, isValidating }: SWRResponse<T, Error> =
    useSWR<T>(
      key,
      fetcher,
      Object.assign({}, options, {
        dedupingInterval: 100,
        revalidateOnReconnect: true, // 断网重连后自动请求
        revalidateOnMount: true, // 所在组件挂载时自动更新， 如果不设置， 却传了 initialData 会自动设置为 false
        revalidateOnFocus: false, // 聚焦时自动请求
        shouldRetryOnError: false, // 请求失败后自动再次请求
      }),
    );

  if (error?.message) {
    Notification.error({ title: '响应失败', content: error?.message });
  }

  return {
    data,
    error,
    hasError: Boolean(error),
    loading: notNil(key) && (isValidating || (!data && !error)),
    reload: mutate,
  };
}

export default useApi;
