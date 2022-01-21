import React, { useMemo, useState } from 'react';
import useApi from '@hooks/useApi';
import TrackPreview from './TrackPreview';

import { Track } from '@models/spotify';
import Loading, { TrackListSkeleton } from './base/loading';

const ArtistTopTracks = ({ artistId }: { artistId: string }) => {
  const {
    data = [],
    loading,
    hasError,
  } = useApi<Track[]>(`/api/spotify/artist/top_tracks`, { artistId });
  const [activeId, setActiveId] = useState<string | null>();

  return (
    <div className="flex flex-col items-stretch px-4 space-y-2">
      <h4 className="font-bold text-lg text-gray-600">热门歌曲</h4>
      <Loading
        loading={loading}
        error={hasError}
        empty={!data?.length}
        skeleton={<TrackListSkeleton count={5} />}
      >
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
          }}
        >
          {data.map((track) => (
            <TrackPreview
              key={track.id}
              track={track}
              playing={activeId === track.id}
              onPlay={(activeId) => setActiveId(activeId)}
            />
          ))}
        </div>
      </Loading>
    </div>
  );
};

export default ArtistTopTracks;
