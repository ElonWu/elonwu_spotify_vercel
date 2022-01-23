import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { Artist } from '@models/spotify';
import { isValidArray } from '@utils/type';

const FollowArtist = atom<Artist[]>({
  key: 'FollowArtist',
  default: [],
});

const useFollowArtist = (): [SwrData<Artist[]>, SetterOrUpdater<Artist[]>] => {
  const [followArtist, setFollowArtist] = useRecoil(FollowArtist);

  const { data, ...rest } = useApi<Artist[]>('/api/spotify/artist/follow');

  useEffect(() => {
    setFollowArtist(data && isValidArray(data) ? data : []);
  }, [data, setFollowArtist]);

  return [{ data: followArtist, ...rest }, setFollowArtist];
};

export default useFollowArtist;
