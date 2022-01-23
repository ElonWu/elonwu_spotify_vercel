import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { isValidArray, notNil } from '@utils/type';

interface UnsplashSearch {}

const UnsplashSearchResult = atom<UnsplashSearch[]>({
  key: 'UnsplashSearchResult',
  default: [],
});

const useUnsplashSearch = (
  search?: string,
): [SwrData<UnsplashSearch[]>, SetterOrUpdater<UnsplashSearch[]>] => {
  const [result, setResult] = useRecoil(UnsplashSearchResult);

  const { data, ...rest } = useApi<UnsplashSearch[]>(
    '/api/unsplash/search',
    {
      keyword: search,
    },
    { shouldFetch: notNil(search) },
  );

  useEffect(() => {
    if (data && isValidArray(data)) setResult(data);
  }, [data, setResult]);

  return [{ data: result, ...rest }, setResult];
};

export default useUnsplashSearch;
