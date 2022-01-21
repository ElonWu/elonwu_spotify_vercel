import React, { useMemo } from 'react';
import type { FC, ReactNode, CSSProperties } from 'react';
import { Empty, Spin, Skeleton } from '@douyinfe/semi-ui';

export interface LoadingProps {
  loading?: boolean;
  error?: boolean;
  empty?: boolean;
  skeleton?: ReactNode;
}

const Loading: FC<LoadingProps> = ({
  loading,
  error,
  empty,
  skeleton,
  children,
}) => {
  const content = useMemo(() => {
    if (loading) {
      if (skeleton)
        return <Skeleton placeholder={skeleton} loading={true} active />;

      return (
        <div className="p-2 flex items-center justify-center">
          <Spin size="large" spinning />
        </div>
      );
    }

    if (error) {
      return <Empty description="获取失败" />;
    }

    if (empty) {
      return <Empty description="暂无数据" />;
    }

    return children;
  }, [loading, skeleton, error, empty, children]);

  return <>{content}</>;
};

export default Loading;

export const ArtistSkeleton = () => {
  return (
    <div className="shrink-0 h-56 w-full p-2 border rounded-md">
      <Skeleton.Avatar style={{ marginRight: 12 }} />
      <div>
        <Skeleton.Title
          style={{ width: 120, marginBottom: 12, marginTop: 12 }}
        />
        <Skeleton.Paragraph style={{ width: '100%' }} rows={3} />
      </div>
    </div>
  );
};

export const TrackSkeleton = () => {
  return (
    <div className="shrink-0 rounded-md shadow-md flex items-center space-x-4 p-2">
      <Skeleton.Avatar />
      <div className="flex-1">
        <Skeleton.Title
          style={{ width: '100%', marginBottom: 12, marginTop: 12 }}
        />
        <Skeleton.Paragraph style={{ width: 100 }} rows={1} />
      </div>
      <Skeleton.Avatar size="small" />
    </div>
  );
};

export const AlbumSkeleton: FC<{ style?: CSSProperties }> = ({
  style = {},
}) => {
  return (
    <div
      className="shrink-0 h-48 w-72 shadow-md rounded-md relative"
      style={style}
    >
      <Skeleton.Image />
      <div className="absolute inset-0 z-index-2 p-4">
        <Skeleton.Title
          style={{ width: 120, marginBottom: 12, marginTop: 12 }}
        />
        <Skeleton.Paragraph style={{ width: '100%' }} rows={3} />
      </div>
    </div>
  );
};

export const AlbumListSkeleton = ({
  count = 5,
  row,
}: {
  count?: number;
  row?: boolean;
}) => {
  const list = useList(count);

  return (
    <div
      className={`flex w-full items-stretch p-2 ${
        row
          ? 'flex-row flex-nowrap space-x-4 overflow-x-auto'
          : 'flex-col space-y-4'
      }`}
    >
      {list.map(({ key }) => (
        <AlbumSkeleton key={key} />
      ))}
    </div>
  );
};

export const TrackListSkeleton = ({
  count = 5,
  row,
}: {
  count?: number;
  row?: boolean;
}) => {
  const list = useList(count);

  return (
    <div
      className={`flex w-full items-stretch p-2 ${
        row
          ? 'flex-row flex-nowrap space-x-4 overflow-x-auto'
          : 'flex-col space-y-4'
      }`}
    >
      {list.map(({ key }) => (
        <TrackSkeleton key={key} />
      ))}
    </div>
  );
};

export const ArtistPreviewSkeleton = () => {
  return (
    <div className="shrink-0 flex flex-col space-y-2">
      <Skeleton.Image className="w-16 h-24" />
      <Skeleton.Title />
    </div>
  );
};

export const ArtistPreviewListSkeleton = ({
  count = 5,
}: {
  count?: number;
}) => {
  const list = useList(count);
  return (
    <div className="flex flex-nowrap space-x-4 w-full overflow-x-auto p-2">
      {list.map(({ key }) => (
        <ArtistPreviewSkeleton key={key} />
      ))}
    </div>
  );
};

const useList = (count: number): { key: any }[] => {
  return useMemo(
    () => new Array(count).fill(0).map((el, i) => ({ key: i })),
    [count],
  );
};

export const PlayerSkeleton: FC<{ style?: CSSProperties }> = ({ style }) => {
  return (
    <div className="w-full" style={style}>
      <div className="flex-1 flex items-center justify-center m-2">
        <Skeleton.Image style={{ width: '100%', height: 320 }} />
      </div>

      <div className="p-4">
        <div className="flex py-2 items-center justify-between">
          <Skeleton.Title style={{ width: 120 }} />
          <Skeleton.Title style={{ width: 120 }} />
        </div>

        <Skeleton.Title />

        <div className="flex space-x-4 items-center justify-center p-4">
          <Skeleton.Button style={{ width: 32 }} />
          <Skeleton.Button style={{ width: 32 }} />
          <Skeleton.Button style={{ width: 32 }} />
        </div>
      </div>
    </div>
  );
};
