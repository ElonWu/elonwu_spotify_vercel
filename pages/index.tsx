import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import GlobalLayout from '@layouts/global';
import { Button } from '@douyinfe/semi-ui';

import { SpotifyLoginGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';

// util
import { useCallback } from 'react';
import { req } from '@utils/request';

import UserNav from '@components/UserNav';
import FollowArtist from '@components/FollowArtist';
import PlaylistOfMine from '@components/PlaylistOfMine';
// import AlbumsNewlyReleased from '@components/AlbumsNewlyReleased';
import AlbumsSaved from '@components/AlbumsSaved';

const Login: NextPage = ({ profile }: any) => {
  const onLogin = useCallback(async () => {
    const res = await req.get<{ uri: string }>('/api/spotify/login');

    if (res?.uri) window.location.href = res.uri;
  }, []);

  return (
    <GlobalLayout title="首页">
      <div className="h-screen w-full overflow-y-auto">
        {profile ? (
          <div className="flex flex-col items-stretch justify-start mb-4 space-y-4">
            <UserNav profile={profile} />

            <AlbumsSaved />
            <FollowArtist />
            <PlaylistOfMine />
            {/* <AlbumsNewlyReleased /> */}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <Button onClick={onLogin}>请授权登录</Button>
          </div>
        )}
      </div>
    </GlobalLayout>
  );
};

export default Login;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyLoginGetServerSideProps;
