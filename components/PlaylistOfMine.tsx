import React, { useMemo, useState } from 'react';
import useApi from '@hooks/useApi';
import { Button, Empty } from '@douyinfe/semi-ui';
import { Playlist } from '@models/spotify';
import { useRouter } from 'next/router';
import TrackPreview from './TrackPreview';
import Loading, { TrackListSkeleton } from './base/loading';

const PlaylistOfMine = () => {
  const router = useRouter();

  const {
    data = [],
    loading,
    hasError,
  } = useApi<Playlist[]>(`/api/spotify/playlist/me`);

  const [activeId, setActiveId] = useState<string | null>();

  return (
    <div className="flex flex-col items-stretch px-4 space-y-4">
      <h4 className="font-bold text-lg text-gray-600">关注歌单</h4>

      <Loading
        loading={loading}
        error={hasError}
        empty={!data?.length}
        skeleton={<TrackListSkeleton />}
      >
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
          }}
        >
          {data.map((playlist) => (
            <div key={playlist.id}>
              <div className="flex items-center justify-between border-b">
                <h4
                  key={playlist.id}
                  onClick={() => router.push(`/playlist/${playlist.id}`)}
                  className="w-full whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {playlist.name}
                </h4>
                <Button onClick={() => router.push(`/player/${playlist.uri}`)}>
                  Play
                </Button>
              </div>
              <div className="grid gap-4">
                {(playlist?.tracks?.items || []).map(({ track }) => (
                  <TrackPreview
                    key={track.id}
                    track={track}
                    playing={activeId === track.id}
                    onPlay={(activeId) => setActiveId(activeId)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Loading>
    </div>
  );
};

export default PlaylistOfMine;
