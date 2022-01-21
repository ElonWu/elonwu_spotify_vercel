import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { SavedAlbum } from '@models/spotify';
import AlbumPreview from './AlbumPreview';
import Loading, { AlbumListSkeleton } from './base/loading';

const AlbumsSaved = () => {
  const {
    data = [],
    loading,
    hasError,
  } = useApi<SavedAlbum[]>(`/api/spotify/album/saved`);

  return (
    <div className="flex flex-col items-stretch px-4 space-y-2">
      <h4 className="font-bold text-lg text-gray-600">收藏专辑</h4>

      <Loading
        loading={loading}
        error={hasError}
        empty={!data?.length}
        skeleton={<AlbumListSkeleton row />}
      >
        <div className="flex flex-nowrap overflow-auto space-x-4 pr-4">
          {data.map(({ album }) => (
            <AlbumPreview album={album} key={album?.id} link showLike />
          ))}
        </div>
      </Loading>
    </div>
  );
};

export default AlbumsSaved;
