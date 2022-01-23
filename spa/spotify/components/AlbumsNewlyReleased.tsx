import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Album } from '@models/spotify';
import AlbumPreview from './AlbumPreview';
import Loading, { AlbumListSkeleton } from '@components/base/loading';

const AlbumsNewlyReleased = () => {
  const {
    data = [],
    loading,
    hasError,
  } = useApi<Album[]>(`/api/spotify/album/newly_released`);

  return (
    <div className="flex flex-col items-stretch px-4 space-y-2">
      <h4 className="font-bold text-lg text-gray-600">最新专辑</h4>

      <Loading
        loading={loading}
        error={hasError}
        empty={!data?.length}
        skeleton={<AlbumListSkeleton row />}
      >
        <div className="flex flex-nowrap overflow-auto space-x-4 pr-4">
          {data.map((album) => (
            <AlbumPreview album={album} key={album?.id} link />
          ))}
        </div>
      </Loading>
    </div>
  );
};

export default AlbumsNewlyReleased;
