import { useCallback, useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';

// omponent
import { IconButton, Input } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';

// util
import { debounce } from 'lodash';
import AlbumPreview from '@components/AlbumPreview';
import TrackPreview from '@components/TrackPreview';
import ArtistPreview from '@components/ArtistPreview';
import Loading, {
  AlbumListSkeleton,
  ArtistPreviewListSkeleton,
  TrackListSkeleton,
} from '@components/base/loading';
import { Album, Track, Artist } from '@models/spotify';
import useSearch from '../store/search';

const Search = () => {
  const [keyword, setKeyword] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const [{ data: result, loading }] = useSearch(search);

  const onSearch = useCallback(
    debounce(async (keyword?: string) => {
      if (!keyword) return;
      setSearch(keyword);
    }, 200),
    [],
  );

  useEffect(() => {
    const lastSearch = sessionStorage.getItem('lastSearchSpotify');

    if (lastSearch) {
      setKeyword(lastSearch);
      onSearch(lastSearch);
    }
  }, []);

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="flex items-center justify-between p-4 space-x-2 bg-white shadow-sm sticky top-0">
        <Input
          className="flex-1"
          value={keyword}
          placeholder="请查找关键字"
          onChange={(value: string) => setKeyword(value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.code === 'Enter') onSearch(keyword);
          }}
        />
        <IconButton icon={<IconSearch />} onClick={() => onSearch(keyword)} />
      </div>

      <div className="flex flex-col space-y-4 px-2 py-4">
        <TrackSearchResult loading={loading} tracks={result?.track?.list} />
        <AlbumSearchResult loading={loading} albums={result?.album?.list} />
        <ArtistSearchResult loading={loading} artists={result?.artist?.list} />
      </div>
    </div>
  );
};

export default Search;

const TrackSearchResult = ({
  loading,
  tracks = [],
}: {
  tracks?: Track[];
  loading?: boolean;
}) => {
  const [activeId, setActiveId] = useState<string | null>();

  return (
    <div className="flex flex-col">
      <h4 className="font-bold text-lg text-gray-600 px-4">歌曲</h4>

      <Loading
        loading={loading}
        empty={!tracks?.length}
        error={false}
        skeleton={<TrackListSkeleton row />}
      >
        <div className="flex flex-nowrap overflow-x-auto space-x-4 p-2">
          {tracks.map((track) => (
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
  );
};

const AlbumSearchResult = ({
  loading,
  albums = [],
}: {
  albums?: Album[];
  loading?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <h4 className="font-bold text-lg text-gray-600 px-4">专辑</h4>

      <Loading
        loading={loading}
        empty={!albums?.length}
        error={false}
        skeleton={<AlbumListSkeleton row />}
      >
        <div className="flex flex-nowrap overflow-x-auto space-x-4 p-2">
          {albums.map((album) => (
            <AlbumPreview album={album} key={album?.id} link />
          ))}
        </div>
      </Loading>
    </div>
  );
};

const ArtistSearchResult = ({
  loading,
  artists = [],
}: {
  artists?: Artist[];
  loading?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <h4 className="font-bold text-lg text-gray-600 px-4">歌手</h4>

      <Loading
        loading={loading}
        empty={!artists?.length}
        error={false}
        skeleton={<ArtistPreviewListSkeleton />}
      >
        <div className="flex flex-nowrap overflow-x-auto space-x-4 p-2">
          {(artists || []).map((artist) => (
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
  );
};
