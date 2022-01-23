import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { Album } from '@models/spotify';
import { isValidArray, notNil } from '@utils/type';

const ArtistAlbum = atom<Album[]>({
  key: 'ArtistAlbum',
  default: [],
});

const useArtistAlbum = (
  artistId?: string,
): [SwrData<Album[]>, SetterOrUpdater<Album[]>] => {
  const [albums, setAlbums] = useRecoil(ArtistAlbum);

  const { data, ...rest } = useApi<Album[]>(
    `/api/spotify/artist/albums`,
    { artistId },
    { shouldFetch: notNil(artistId) },
  );

  useEffect(() => {
    if (data && isValidArray(data)) setAlbums(data);
  }, [data, setAlbums]);

  return [{ data: albums, ...rest }, setAlbums];
};

export default useArtistAlbum;
