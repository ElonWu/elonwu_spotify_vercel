import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { Playlist } from '@models/spotify';
import { notNil } from '@utils/type';

const PlaylistDetail = atom<Playlist | null>({
  key: 'PlaylistDetail',
  default: null,
});

const usePlaylist = (
  playlistId?: string,
): [SwrData<Playlist | null>, SetterOrUpdater<Playlist | null>] => {
  const [artist, setPlaylist] = useRecoil(PlaylistDetail);

  const { data, ...rest } = useApi<Playlist | null>(
    `/api/spotify/playlist/${playlistId}`,
    {},
    { shouldFetch: notNil(playlistId) },
  );

  useEffect(() => {
    if (data) setPlaylist(data);
  }, [data, setPlaylist]);

  return [{ data: artist, ...rest }, setPlaylist];
};

export default usePlaylist;
