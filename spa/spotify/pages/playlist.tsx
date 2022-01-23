import { useMemo, useEffect, useState } from 'react';

import { Button } from '@douyinfe/semi-ui';

import { useRouter } from 'next/router';
import TrackPreview from '@components/TrackPreview';
import Loading, {
  ArtistSkeleton,
  TrackListSkeleton,
} from '@components/base/loading';
import Image from 'next/image';
import usePlaylist from '../store/playlist';
import { useParams } from 'react-router-dom';

const Playlist = () => {
  const router = useRouter();
  const params = useParams();

  const playlistId = useMemo(() => params?.playlistId, [params]);

  useEffect(() => {
    if (!playlistId) router.back();
  }, [playlistId, router]);

  const [{ data, loading, hasError }] = usePlaylist(playlistId);

  const [activeId, setActiveId] = useState<string | null>();

  const { url, width, height } = useMemo(
    () => data?.images?.[0] || { url: '', width: 0, height: 0 },
    [data],
  );

  return (
    <div className="flex flex-col space-y-4 items-stretch pb-4">
      <Loading
        loading={loading}
        error={hasError}
        empty={!data}
        skeleton={<ArtistSkeleton />}
      >
        {data && (
          <div className="w-full shrink-0 cursor-pointer relative">
            <Image
              src={url}
              width={width || 400}
              height={height || 400}
              alt={data.name}
            />
            <div
              className="absolute inset-0 p-4 flex flex-col space-y-4 items-stretch justify-end"
              style={{
                background: `linear-gradient(to bottom, #00000000, #000000)`,
              }}
            >
              <div className="flex items-center justify-between px-4">
                <h4 className="font-bold text-lg text-gray-600 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {data.name}
                </h4>
                <Button onClick={() => router.push(`/player/${data.uri}`)}>
                  Play All
                </Button>
              </div>
            </div>
          </div>
        )}
      </Loading>

      <Loading
        loading={loading}
        error={hasError}
        empty={!data?.tracks?.items?.length}
        skeleton={<TrackListSkeleton />}
      >
        <div className="grid gap-4 px-4">
          {(data?.tracks?.items || []).map((item) => (
            <TrackPreview
              key={item?.track?.id}
              track={item?.track}
              playing={activeId === item?.track.id}
              onPlay={(activeId) => setActiveId(activeId)}
            />
          ))}
        </div>
      </Loading>
    </div>
  );
};

export default Playlist;
