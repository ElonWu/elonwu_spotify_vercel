import React, { useEffect, useMemo } from 'react';

// 布局
import { ElonRouter, Outlet } from '@components/base/router';
import Loading from '@components/base/loading';
// 页面
import Search from './pages/search';

const Router = () => {
  const routes = useMemo(() => {
    return [
      // 默认页面
      {
        key: 'Global',
        component: Global,
        path: '/unsplash',
        routes: [
          {
            component: Layout,
            key: 'Layout',
            routes: [
              {
                key: 'search',
                title: '搜索',
                component: Search,
                index: true,
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
