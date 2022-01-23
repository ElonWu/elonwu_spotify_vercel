import React, { useMemo } from 'react';
import { Artist } from '@models/spotify';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ArtistPreview = ({
  artist,
  link,
}: {
  artist: Artist;
  link?: boolean;
}) => {
  const router = useRouter();

  const {
    url = '',
    width = 0,
    height = 0,
  } = useMemo(() => artist?.images?.[0] || {}, [artist]);

  return (
    <div
      className="w-full shrink-0 cursor-pointer relative"
      onClick={() => link && router.push(`/artist/${artist?.id}`)}
    >
      {url && (
        <Image src={url} alt={artist?.name} width={width} height={height} />
      )}
      <div
        className="absolute inset-0 p-4 flex flex-col space-y-2 items-stretch justify-end"
        style={{
          background: `linear-gradient(to bottom, #00000000, #000000)`,
        }}
      >
        <h4 className="font-bold text-lg text-green-500 w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {artist?.name}
        </h4>

        <div className="w-full flex space-x-2 overflow-x-auto">
          {artist?.genres?.map((genre) => (
            <p
              key={genre}
              className="text-xs text-green-600 whitespace-nowrap px-1 bg-green-50 rounded-sm"
            >
              {genre}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPreview;
