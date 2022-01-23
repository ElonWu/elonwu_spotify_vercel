import type { NextPage } from 'next';

// omponent
import GlobalLayout from '@layouts/global';
import Unsplash from 'apps/unsplash';

const SpotifyHome: NextPage = () => {
  return (
    <GlobalLayout title="首页">
      <Unsplash />
    </GlobalLayout>
  );
};

export default SpotifyHome;
