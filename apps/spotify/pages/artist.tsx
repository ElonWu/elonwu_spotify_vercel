import React, { useMemo, useEffect } from 'react';

// component
import GlobalLayout from '@layouts/global';
import ArtistProfile from '../components/ArtistProfile';
import ArtistTopTracks from '../components/ArtistTopTracks';
import ArtistAlbums from '../components/ArtistAlbums';

import { useParams, useNavigate } from 'react-router-dom';

const Artist = () => {
  const params = useParams();
  const navigate = useNavigate();

  const artistId = useMemo(() => params?.artistId, [params]);

  useEffect(() => {
    if (!artistId) navigate(-1);
  }, [artistId, navigate]);

  return (
    <GlobalLayout title="歌手详情">
      <div className="flex flex-col items-stretch justify-start mb-4 space-y-4">
        <ArtistProfile artistId={artistId as string} />
        <ArtistAlbums artistId={artistId as string} />
        <ArtistTopTracks artistId={artistId as string} />
      </div>
    </GlobalLayout>
  );
};

export default Artist;
