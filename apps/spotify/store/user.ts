import { useEffect } from 'react';
import { atom } from 'recoil';
import type { SetterOrUpdater } from 'recoil';

import useRecoil from '@hooks/useRecoil';
import useApi, { SwrData } from '@hooks/useApi';

import { User } from '@models/spotify';

const User = atom<User | null>({
  key: 'User',
  default: null,
});

const useUser = (): [User | null, SetterOrUpdater<User | null>] => {
  const [user, setUser] = useRecoil(User);

  return [user, setUser];
};

export default useUser;
