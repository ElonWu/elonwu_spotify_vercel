import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { SearchResultReponse } from '@models/spotify';
import { notNil } from '@utils/type';

const SearchResult = atom<SearchResultReponse | null>({
  key: 'SearchResultReponseDetail',
  default: null,
});

const useSearch = (
  search?: string,
): [
  SwrData<SearchResultReponse | null>,
  SetterOrUpdater<SearchResultReponse | null>,
] => {
  const [result, setResult] = useRecoil(SearchResult);

  const { data, ...rest } = useApi<SearchResultReponse | null>(
    '/api/spotify/search',
    {
      q: search,
      type: [
        'album',
        'artist',
        'track',
        // 'playlist',
      ].join(','),
    },
    { shouldFetch: notNil(search) },
  );

  useEffect(() => {
    if (data) setResult(data);
  }, [data, setResult]);

  return [{ data: result, ...rest }, setResult];
};

export default useSearch;
