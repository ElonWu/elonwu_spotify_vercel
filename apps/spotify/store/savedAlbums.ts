import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { SavedAlbum } from '@models/spotify';
import { isValidArray } from '@utils/type';

const SavedAlbums = atom<SavedAlbum[]>({
  key: 'SavedAlbums',
  default: [],
});

const useSavedAlbums = (): [
  SwrData<SavedAlbum[]>,
  SetterOrUpdater<SavedAlbum[]>,
] => {
  const [savedAlbums, setSavedAlbums] = useRecoil(SavedAlbums);

  const { data, ...rest } = useApi<SavedAlbum[]>('/api/spotify/album/saved');

  useEffect(() => {
    setSavedAlbums(data && isValidArray(data) ? data : []);
  }, [data, setSavedAlbums]);

  return [{ data: savedAlbums, ...rest }, setSavedAlbums];
};

export default useSavedAlbums;
