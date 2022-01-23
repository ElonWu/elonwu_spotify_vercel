import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { Playlist } from '@models/spotify';
import { isValidArray } from '@utils/type';

const MyPlaylist = atom<Playlist[]>({
  key: 'MyPlaylist',
  default: [],
});

const useMyPlaylist = (): [
  SwrData<Playlist[]>,
  SetterOrUpdater<Playlist[]>,
] => {
  const [myPlaylist, setMyPlaylist] = useRecoil(MyPlaylist);

  const { data, ...rest } = useApi<Playlist[]>('/api/spotify/playlist/me');

  useEffect(() => {
    setMyPlaylist(data && isValidArray(data) ? data : []);
  }, [data, setMyPlaylist]);

  return [{ data: myPlaylist, ...rest }, setMyPlaylist];
};

export default useMyPlaylist;
