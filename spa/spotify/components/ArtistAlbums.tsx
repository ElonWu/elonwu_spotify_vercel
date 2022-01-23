import React from 'react';
import AlbumPreview from './AlbumPreview';
import Loading, { AlbumListSkeleton } from '@components/base/loading';
import useArtistAlbum from 'spa/spotify/store/artistAlbum';

const ArtistAlbums = ({ artistId }: { artistId: string }) => {
  const [{ data = [], hasError, loading }] = useArtistAlbum(artistId);

  return (
    <div className="flex flex-col items-stretch px-4 space-y-2">
      <h4 className="font-bold text-lg text-gray-600">专辑</h4>

      <Loading
        loading={loading}
        error={hasError}
        empty={!data?.length}
        skeleton={<AlbumListSkeleton row count={3} />}
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

export default ArtistAlbums;
