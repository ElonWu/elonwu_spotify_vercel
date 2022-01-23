// omponent
import { Button } from '@douyinfe/semi-ui';

// util
import { useCallback } from 'react';
import { req } from '@utils/request';

import useUser from '../store/user';

// components
import UserNav from '../components/UserNav';
import FollowArtist from '../components/FollowArtist';
import PlaylistOfMine from '../components/PlaylistOfMine';
import AlbumsSaved from '../components/AlbumsSaved';

const Home = () => {
  const onLogin = useCallback(async () => {
    const res = await req.get<{ uri: string }>('/api/spotify/login');

    if (res?.uri) window.location.href = res.uri;
  }, []);

  const [user, setUser] = useUser();

  return (
    <div className="h-screen w-full overflow-y-auto">
      {user ? (
        <div className="flex flex-col items-stretch justify-start mb-4 space-y-4">
          <UserNav />
          <AlbumsSaved />
          <FollowArtist />
          <PlaylistOfMine />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <Button onClick={onLogin}>请授权登录</Button>
        </div>
      )}
    </div>
  );
};

export default Home;
