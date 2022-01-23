import React, { useMemo, useState } from 'react';
import useApi from '@hooks/useApi';
import { Button, Empty } from '@douyinfe/semi-ui';
import { Playlist } from '@models/spotify';
import { useRouter } from 'next/router';
import TrackPreview from './TrackPreview';

const TracksRecommend = () => {
  const router = useRouter();

  const { data } = useApi<{ list: Playlist[] }>(`/api/spotify/playlist/me`);

  const list: Playlist[] = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data],
  );

  const [activeId, setActiveId] = useState<string | null>();

  if (!list.length) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div className="flex flex-col items-stretch px-4 space-y-4">
      <h4 className="font-bold text-lg text-gray-600">推荐歌单</h4>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))` }}
      >
        {list.map((playlist) => (
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
    </div>
  );
};

export default TracksRecommend;
