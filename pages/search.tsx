import type { NextPage } from 'next';

// omponent
import GlobalLayout from '@layouts/global';
import { Button, Empty, IconButton, Input } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';

// util
import { useCallback, useEffect, useState } from 'react';
import type { FC, KeyboardEvent } from 'react';

import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import { debounce } from 'lodash';
import { req } from '@utils/request';
import { Album, SearchResultReponse, Track, Artist } from '@models/spotify';
import AlbumPreview from '@components/AlbumPreview';
import TrackPreview from '@components/TrackPreview';
import ArtistPreview from '@components/ArtistPreview';
import Loading, {
  AlbumListSkeleton,
  ArtistPreviewListSkeleton,
  TrackListSkeleton,
} from '@components/base/loading';

const SearchSpotify: NextPage = () => {
  const [search, setSearch] = useState<string | undefined>();

  const [result, setResult] = useState<SearchResultReponse>();

  const [loading, setLoading] = useState(false);

  const onSearch = useCallback(
    debounce(async (search?: string) => {
      if (!search) return;
      setLoading(true);
      const data = await req.get<SearchResultReponse>('/api/spotify/search', {
        q: search,
        type: ['album', 'artist', 'playlist', 'track'].join(','),
      });
      setLoading(false);
      sessionStorage.setItem('lastSearchSpotify', search);

      if (data) setResult(data);
    }, 200),
    [],
  );

  const [activeId, setActiveId] = useState<string | null>();

  useEffect(() => {
    const lastSearch = sessionStorage.getItem('lastSearchSpotify');

    if (lastSearch) {
      setSearch(lastSearch);
      onSearch(lastSearch);
    }
  }, []);

  return (
    <GlobalLayout title="搜索">
      <div className="h-screen w-full overflow-y-auto">
        <div className="flex items-center justify-between p-4 space-x-2 bg-white shadow-sm sticky top-0">
          <Input
            className="flex-1"
            value={search}
            placeholder="请查找关键字"
            onChange={(value: string) => setSearch(value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.code === 'Enter') onSearch(search);
            }}
          />
          <IconButton icon={<IconSearch />} onClick={() => onSearch(search)} />
        </div>

        <div className="flex flex-col space-y-4 px-2 py-4">
          <div className="flex flex-col">
            <h4 className="font-bold text-lg text-gray-600 px-4">歌曲</h4>

            <Loading
              loading={loading}
              empty={!result?.track?.list?.length}
              error={false}
              skeleton={<TrackListSkeleton row />}
            >
              <div className="flex flex-nowrap overflow-x-auto space-x-4 p-2">
                {(result?.track?.list || []).map((track: Track) => (
                  <TrackPreview
                    key={track?.id}
                    track={track}
                    playing={activeId === track.id}
                    onPlay={(activeId) => setActiveId(activeId)}
                    showDuration={false}
                    style={{ width: 250 }}
                  />
                ))}
              </div>
            </Loading>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-lg text-gray-600 px-4">专辑</h4>

            <Loading
              loading={loading}
              empty={!result?.album?.list?.length}
              error={false}
              skeleton={<AlbumListSkeleton row />}
            >
              <div className="flex flex-nowrap overflow-x-auto space-x-4 p-2">
                {(result?.album?.list || []).map((album: Album) => (
                  <AlbumPreview album={album} key={album?.id} link />
                ))}
              </div>
            </Loading>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-lg text-gray-600 px-4">歌手</h4>

            <Loading
              loading={loading}
              empty={!result?.artist?.list?.length}
              error={false}
              skeleton={<ArtistPreviewListSkeleton />}
            >
              <div className="flex flex-nowrap overflow-x-auto space-x-4 p-2">
                {(result?.artist?.list || []).map((artist: Artist) => (
                  <div
                    key={artist?.id}
                    className="shrink-0 w-56 h-56 flex rounded-md overflow-hidden"
                  >
                    <ArtistPreview artist={artist} link />
                  </div>
                ))}
              </div>
            </Loading>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default SearchSpotify;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;
