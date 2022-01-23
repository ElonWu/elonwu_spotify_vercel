import React, { useEffect, useMemo } from 'react';
import useUser from './store/user';

// 布局
import { ElonRouter, Outlet } from '@components/base/router';
import Loading from '@components/base/loading';
import { User } from '@models/spotify';

// 页面
import Home from './pages/home';
import Search from './pages/search';
import Artist from './pages/artist';
import Album from './pages/album';
import Playlist from './pages/playlist';

const Router = ({ profile }: { profile: User }) => {
  const [user, setUser] = useUser();

  useEffect(() => {
    setUser(profile);
  }, [setUser, profile]);

  const routes = useMemo(() => {
    return [
      // 默认页面
      {
        key: 'Global',
        component: Global,
        path: '/spotify',
        routes: [
          {
            component: Layout,
            key: 'Layout',
            routes: [
              {
                key: 'home',
                title: '首页',
                component: Home,
                index: true,
              },
              {
                key: 'search',
                title: '搜索',
                component: Search,
                path: '/spotify/search',
              },
              {
                key: 'album',
                title: '专辑',
                component: Album,
                path: '/spotify/album/:albumId',
              },
              {
                key: 'artist',
                title: '歌手',
                component: Artist,
                path: '/spotify/artist/:artistId',
              },
              {
                key: 'playlist',
                title: '播放列表',
                component: Playlist,
                path: '/spotify/playlist/:playlistId',
              },
            ],
          },
        ],
      },
    ];
  }, []);

  return <ElonRouter rootRoutes={routes} loading={<Loading />} basename="/" />;
};

export default Router;

const Global = () => {
  // TODO 其他 spa 配置
  return <Outlet />;
};

const Layout = () => {
  return (
    <div className="bg-gray-50 w-screen overflow-x-hidden min-h-screen">
      <Outlet />
    </div>
  );
};
