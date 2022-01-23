import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { Track } from '@models/spotify';
import { isValidArray, notNil } from '@utils/type';

const ArtistTopTracks = atom<Track[]>({
  key: 'ArtistTopTracks',
  default: [],
});

const useArtistTopTracks = (
  artistId?: string,
): [SwrData<Track[]>, SetterOrUpdater<Track[]>] => {
  const [tracks, setTracks] = useRecoil(ArtistTopTracks);

  const { data, ...rest } = useApi<Track[]>(
    `/api/spotify/artist/top_tracks`,
    { artistId },
    { shouldFetch: notNil(artistId) },
  );

  useEffect(() => {
    if (data && isValidArray(data)) setTracks(data);
  }, [data, setTracks]);

  return [{ data: tracks, ...rest }, setTracks];
};

export default useArtistTopTracks;
