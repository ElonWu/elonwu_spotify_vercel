import React from 'react';

// 全局状态
import { RecoilRoot } from 'recoil';
import Router from './router';

const Spotify = () => {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
};

export default Spotify;
