import React, { useMemo } from 'react';

import ArtistPreview from './ArtistPreview';
import Loading, { ArtistSkeleton } from '@components/base/loading';
import useArtist from 'spa/spotify/store/artist';

const ArtistProfile = ({ artistId }: { artistId: string }) => {
  const [{ data, loading, hasError }] = useArtist(artistId);

  return (
    <Loading
      loading={loading}
      error={hasError}
      empty={!data}
      skeleton={<ArtistSkeleton />}
    >
      {data && <ArtistPreview artist={data} />}
    </Loading>
  );
};

export default ArtistProfile;
