import React from 'react';
import { Button, Empty } from '@douyinfe/semi-ui';
import Loading, { TrackListSkeleton } from '@components/base/loading';
import useMyPlaylist from '../store/myPlaylist';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

const PlaylistOfMine = () => {
  const router = useRouter();
  const navigate = useNavigate();

  const [{ data = [], loading, hasError }] = useMyPlaylist();

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
                  onClick={() => navigate(`/spotify/playlist/${playlist.id}`)}
                  className="w-full whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {playlist.name}
                </h4>
                <Button onClick={() => router.push(`/player/${playlist.uri}`)}>
                  Play
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Loading>
    </div>
  );
};

export default PlaylistOfMine;
