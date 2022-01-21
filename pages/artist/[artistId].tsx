import type { GetServerSidePropsContext, NextPage } from 'next';

// component
import GlobalLayout from '@layouts/global';

// util
import { useMemo, useEffect } from 'react';

import ArtistProfile from '@components/ArtistProfile';
import ArtistTopTracks from '@components/ArtistTopTracks';
import ArtistAlbums from '@components/ArtistAlbums';
import { useRouter } from 'next/router';

import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';

const ArtistDetail: NextPage = () => {
  const router = useRouter();

  const artistId = useMemo(() => router?.query?.artistId, [router?.query]);

  useEffect(() => {
    if (!artistId) router.back();
  }, [artistId, router]);

  return (
    <GlobalLayout title="歌手详情">
      <div className="flex flex-col items-stretch justify-start mb-4 space-y-4">
        <ArtistProfile artistId={artistId as string} />
        <ArtistAlbums artistId={artistId as string} />
        <ArtistTopTracks artistId={artistId as string} />
      </div>
    </GlobalLayout>
  );
};

export default ArtistDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;
