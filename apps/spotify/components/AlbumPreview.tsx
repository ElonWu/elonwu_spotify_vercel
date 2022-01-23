import React, { useCallback, useEffect, useState } from 'react';
import type { CSSProperties, FC } from 'react';
import { Album } from '@models/spotify';
import { IconLikeHeart } from '@douyinfe/semi-icons';
import { req } from '@utils/request';
import { throttle } from 'lodash';
import { Notification } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';

const AlbumPreview: FC<{
  album: Album;
  link?: boolean;
  showLike?: boolean;
  style?: CSSProperties;
}> = ({ album, link, showLike, style = {} }) => {
  const navigate = useNavigate();

  return (
    album && (
      <div
        className="shrink-0 h-48 w-72 rounded-md overflow-hidden bg-no-repeat bg-cover bg-center cursor-pointer"
        style={Object.assign(
          {},
          { backgroundImage: `url(${album?.images?.[0]?.url})` },
          style,
        )}
        onClick={() => link && navigate(`/spotify/album/${album?.id}`)}
      >
        <div
          className="h-full shadow-md p-4 flex flex-col items-start justify-between"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(var(--semi-grey-5), .6), rgba(var(--semi-grey-9), .6))`, // bg-gradient-to-br from-gray-500/50 to-gray-900/50 bg-opacity-60
          }}
        >
          <div className="flex items-center justify-between space-x-4 w-full">
            <h4 className="flex-1 text-2xl font-bold text-white w-full whitespace-nowrap overflow-hidden text-ellipsis">
              {album?.name}
            </h4>

            {showLike && <LikeStatus albumId={album?.id} />}
          </div>
          <p className="text-xs text-gray-200 ">
            发行日期：{album?.release_date}
          </p>
        </div>
      </div>
    )
  );
};

export default AlbumPreview;

const LikeStatus = ({ albumId }: { albumId: string }) => {
  const [saved, setSaved] = useState<boolean>(false);

  const checkSaved = useCallback(async () => {
    const result = await req.get<{ [key: string]: boolean }>(
      '/api/spotify/album/check_saved',
      {
        ids: albumId,
      },
    );

    setSaved(result?.[albumId] || false);
  }, [albumId]);

  // 更新收藏状态
  const toggleSaved = useCallback(
    throttle(async () => {
      let prev = saved;

      try {
        await req.post(`/api/spotify/album/${prev ? 'unsave' : 'save'}`, {
          ids: [albumId],
        });
        setSaved(!prev);

        Notification.success({ content: '更新成功' });
      } catch (err) {
        Notification.error({ content: '更新失败' });
      }
    }, 200),
    [saved, albumId],
  );

  // 检查初始收藏状态
  useEffect(() => {
    checkSaved();
  }, [checkSaved]);

  return (
    <span
      className="cursor-pointer border rounded-full h-8 w-8 grid place-content-center"
      onClick={(e) => {
        e.stopPropagation();
        toggleSaved();
      }}
    >
      <IconLikeHeart
        className={`transition ${saved ? 'text-red-500' : 'text-gray-400'}`}
      />
    </span>
  );
};
