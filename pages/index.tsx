import type { NextPage } from 'next';

import { useMemo } from 'react';
import { useRouter } from 'next/router';
import GlobalLayout from '@layouts/global';
import Link from 'next/link';

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
      {
        key: 'map',
        path: '/map',
        icon: '',
        title: 'Map',
      },
    ],
    [],
  );

  return (
    <GlobalLayout title="首页">
      <div className="h-screen w-full overflow-y-auto">
        <h4 className="p-4 border-b ">首页</h4>

        <div className="p-4 grid gap-4 grid-cols-3">
          {apps.map(({ key, path, icon, title }) => (
            <Link key={key} href={path}>
              <div className="grid gap-2 items-center justify-center place-items-center">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full border bg-gray-400"></div>

                <h4>{title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
};

export default Home;
