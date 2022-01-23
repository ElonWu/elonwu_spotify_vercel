import { useRecoilValue, useSetRecoilState } from 'recoil';
import type { RecoilState, SetterOrUpdater } from 'recoil';
import { useCallback, useState } from 'react';

function useRecoil<T>(state: RecoilState<T>): [T, SetterOrUpdater<T>] {
  const value = useRecoilValue(state);
  const update = useSetRecoilState(state);

  return [value, update];
}

export default useRecoil;
