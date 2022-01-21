import type { GetServerSidePropsContext, NextPage } from 'next';

// omponent
import GlobalLayout from '@layouts/global';
import { Button } from '@douyinfe/semi-ui';

// util
import { useMemo, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import useApi from '@hooks/useApi';
import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import TrackPreview from '@components/TrackPreview';
import { Album, Track } from '@models/spotify';
import AlbumPreview from '@components/AlbumPreview';
import Loading, {
  TrackListSkeleton,
  AlbumSkeleton,
} from '@components/base/loading';

const ArtistedDetail: NextPage = () => {
  const router = useRouter();

  const albumId = useMemo(() => router?.query?.albumId, [router?.query]);

  useEffect(() => {
    if (!albumId) router.back();
  }, [albumId, router]);

  const { data, loading, hasError } = useApi<Album>(
    `/api/spotify/album/${albumId}`,
  );

  const [activeId, setActiveId] = useState<string | null>();

  const title = useMemo(() => `专辑详情-${data?.name || '-'}`, [data]);

  return (
    <GlobalLayout title={title}>
      <div className="flex flex-col items-stretch space-y-4">
        <Loading
          loading={loading}
          error={hasError}
          empty={!data}
          skeleton={
            <AlbumSkeleton
              style={{ width: 'calc(100% - 32px)', margin: '16px 16px 0' }}
            />
          }
        >
          <div className="flex justify-center px-4 pt-4">
            {data && <AlbumPreview album={data} style={{ width: '100%' }} />}
          </div>
        </Loading>

        <div className="flex flex-col space-y-4 items-stretch pb-4">
          <div className="flex items-center justify-between px-4">
            <h4 className="font-bold text-lg text-gray-600 w-full whitespace-nowrap overflow-hidden text-ellipsis">
              专辑歌曲
            </h4>
            {data && (
              <Button onClick={() => router.push(`/player/${data.uri}`)}>
                Play All
              </Button>
            )}
          </div>

          <Loading
            loading={loading}
            error={hasError}
            empty={!data?.tracks?.items?.length}
            skeleton={<TrackListSkeleton />}
          >
            <div className="grid gap-4 px-4">
              {(data?.tracks?.items || []).map((track: Track) => (
                <TrackPreview
                  key={track?.id}
                  track={track}
                  playing={activeId === track.id}
                  onPlay={(activeId) => setActiveId(activeId)}
                />
              ))}
            </div>
          </Loading>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default ArtistedDetail;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;
