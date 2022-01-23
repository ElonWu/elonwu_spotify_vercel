import { createApi } from 'unsplash-js';

const { UNSPLASH_ACCESS_KEY } = process.env;

const unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY as string,
});

/**
 * @description 关键词搜索
 * @param query
 * @returns
 */
export const searchPhotos = async ({
  query,
}: {
  query: string;
}): Promise<any[]> => {
  const result = await unsplash.search.getPhotos({
    query,
    page: 1,
    perPage: 3,
  });

  if (result.type === 'success') {
    return Promise.resolve(result?.response?.results || []);
  }

  return Promise.reject(result?.errors?.[0] || 'unspalsh request error');
};

/**
 * @description 触发下载
 * @param
 * @returns
 */
export const triggerDownload = async (
  download_location: string,
): Promise<any> => {
  const result = await unsplash.photos.trackDownload({
    downloadLocation: download_location,
  });

  if (result.type === 'success') {
    return Promise.resolve(result?.response);
  }

  return Promise.reject(result?.errors?.[0] || 'unspalsh request error');
};
