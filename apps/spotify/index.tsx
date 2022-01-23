import React from 'react';
import type { FC } from 'react';

// 全局状态
import { RecoilRoot } from 'recoil';
import Router from './router';
import { User } from '@models/spotify';

const Spotify: FC<{ profile: User }> = ({ profile }) => {
  return (
    <RecoilRoot>
      <Router profile={profile} />
    </RecoilRoot>
  );
};

export default Spotify;
