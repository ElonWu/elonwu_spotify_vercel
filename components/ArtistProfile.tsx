import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';

import { Artist } from '@models/spotify';
import ArtistPreview from './ArtistPreview';
import Loading, { ArtistSkeleton } from './base/loading';

const ArtistProfile = ({ artistId }: { artistId: string }) => {
  const { data, loading, hasError } = useApi<Artist>(
    `/api/spotify/artist/profile`,
    { artistId },
  );

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
