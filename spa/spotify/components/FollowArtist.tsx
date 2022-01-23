import React from 'react';
import Loading, { ArtistPreviewListSkeleton } from '@components/base/loading';

import { useNavigate } from 'react-router-dom';
import useFollowArtist from '../store/followArtist';

const FollowArtist = () => {
  const navigate = useNavigate();

  const [{ data = [], loading, hasError }] = useFollowArtist();

  return (
    <div className="flex flex-col items-stretch px-4 space-y-2">
      <h4 className="font-bold text-lg text-gray-600">关注歌手</h4>
      <Loading
        loading={loading}
        error={hasError}
        empty={!data?.length}
        skeleton={<ArtistPreviewListSkeleton />}
      >
        <div className="flex flex-nowrap overflow-auto space-x-4 pr-4">
          {data.map((artist) => {
            return (
              <div
                key={artist.id}
                onClick={() => navigate(`/spotify/artist/${artist.id}`)}
                className="shrink-0 flex flex-col items-center justify-start cursor-pointer"
              >
                <div
                  className="rounded-md shadow-md  bg-no-repeat bg-cover bg-center w-16 h-24"
                  style={{
                    backgroundImage: `url(${artist.images?.[0]?.url})`,
                  }}
                />
                <h2 className="text-center text-sm text-gray-500 w-16 whitespace-nowrap overflow-hidden text-ellipsis">
                  {artist.name}
                </h2>
              </div>
            );
          })}
        </div>
      </Loading>
    </div>
  );
};

export default FollowArtist;
