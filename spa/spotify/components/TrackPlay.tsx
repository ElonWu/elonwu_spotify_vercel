import React, { useMemo } from 'react';
import { Empty } from '@douyinfe/semi-ui';
import { Track } from '@models/spotify';
import { useRouter } from 'next/router';
import Image from 'next/image';
const TrackPlay = ({ track }: { track: Track }) => {
  const router = useRouter();

  const {
    url = '',
    width = 0,
    height = 0,
  } = useMemo(() => track?.album?.images?.[0] || {}, [track]);

  if (!track) return <Empty title="暂无数据" />;

  return (
    <div
      className="w-full p-4 bg-white rounded-md shadow-md flex items-center space-x-4 cursor-pointer"
      onClick={() => {
        const albumId = (track?.album?.uri || '').split(':')[2];
        if (albumId) router.replace(`/spotify/album/${albumId}`);
      }}
    >
      <Image
        src={url}
        width={width}
        height={height}
        alt="Album"
        className="h-auto rounded-sm"
      />
    </div>
  );
};

export default TrackPlay;
