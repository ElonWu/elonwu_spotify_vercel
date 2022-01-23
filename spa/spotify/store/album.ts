import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { Album } from '@models/spotify';
import { notNil } from '@utils/type';

const AlbumDetail = atom<Album | null>({
  key: 'AlbumDetail',
  default: null,
});

const useAlbum = (
  albumId?: string,
): [SwrData<Album | null>, SetterOrUpdater<Album | null>] => {
  const [album, setAlbum] = useRecoil(AlbumDetail);

  const { data, ...rest } = useApi<Album | null>(
    `/api/spotify/album/${albumId}`,
    {},
    { shouldFetch: notNil(albumId) },
  );

  useEffect(() => {
    if (data) setAlbum(data);
  }, [data, setAlbum]);

  return [{ data: album, ...rest }, setAlbum];
};

export default useAlbum;
