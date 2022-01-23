import type { NextPage } from 'next';

import { useMemo } from 'react';
import { useRouter } from 'next/router';
import GlobalLayout from '@layouts/global';

const Home: NextPage = () => {
  const router = useRouter();

  const apps = useMemo(
    () => [
      {
        key: 'spotify',
        path: '/spotify',
        icon: '',
        title: 'Spotify',
      },
      {
        key: 'unsplash',
        path: '/unsplash',
        icon: '',
        title: 'Unsplash',
      },
    ],
    [],
  );

  return (
    <GlobalLayout title="首页">
      <div className="h-screen w-full overflow-y-auto">
        <h4 className="p-4 border-b ">首页</h4>

        <div className="p-4 grid gap-4">
          {apps.map(({ key, path, icon, title }) => (
            <div key={key} onClick={() => router.push(path)}>
              <h4>{title}</h4>
            </div>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
};

export default Home;
