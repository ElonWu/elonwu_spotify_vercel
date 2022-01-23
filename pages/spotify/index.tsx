import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import GlobalLayout from '@layouts/global';
import Spotify from 'spa/spotify';
import { Button } from '@douyinfe/semi-ui';

import { SpotifyLoginGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';

// util
import { useCallback } from 'react';
import { req } from '@utils/request';
import { User } from '@models/spotify';

const SpotifyHome: NextPage<{ profile: User }> = ({ profile }) => {
  const onLogin = useCallback(async () => {
    const res = await req.get<{ uri: string }>('/api/spotify/login');

    if (res?.uri) window.location.href = res.uri;
  }, []);

  return (
    <GlobalLayout title="首页">
      <div className="h-screen w-full overflow-y-auto">
        {profile ? (
          <Spotify profile={profile} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <Button onClick={onLogin}>请授权登录</Button>
          </div>
        )}
      </div>
    </GlobalLayout>
  );
};

export default SpotifyHome;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyLoginGetServerSideProps;
