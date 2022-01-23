import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { Artist } from '@models/spotify';
import { notNil } from '@utils/type';

const ArtistDetail = atom<Artist | null>({
  key: 'ArtistDetail',
  default: null,
});

const useArtist = (
  artistId?: string,
): [SwrData<Artist | null>, SetterOrUpdater<Artist | null>] => {
  const [artist, setArtist] = useRecoil(ArtistDetail);

  const { data, ...rest } = useApi<Artist | null>(
    `/api/spotify/artist/profile`,
    { artistId },
    { shouldFetch: notNil(artistId) },
  );

  useEffect(() => {
    if (data) setArtist(data);
  }, [data, setArtist]);

  return [{ data: artist, ...rest }, setArtist];
};

export default useArtist;
