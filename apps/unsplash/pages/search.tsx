import { Button, Empty, IconButton, Input } from '@douyinfe/semi-ui';
import { IconDownload, IconSearch } from '@douyinfe/semi-icons';

// util
import { useCallback, useEffect, useState } from 'react';
import type { FC, KeyboardEvent } from 'react';

import { debounce } from 'lodash';
import Loading from '@components/base/loading';
import Image from 'next/image';
import useUnsplashSearch from '../store/search';
import { req } from '@utils/request';

interface UnsplashImage {}

const SearchUnsplash = () => {
  const [keyword, setKeyword] = useState<string | undefined>();

  const [search, setSearch] = useState<string | undefined>();

  const [{ data: list, loading }] = useUnsplashSearch(search);

  const onSearch = useCallback(
    debounce(async (keyword?: string) => {
      if (!keyword) return;
      setSearch(keyword);
      sessionStorage.setItem('lastSearchUnsplash', keyword);
    }, 200),
    [],
  );

  useEffect(() => {
    const lastSearch = sessionStorage.getItem('lastSearchUnsplash');

    if (lastSearch) {
      setKeyword(lastSearch);
      onSearch(lastSearch);
    }
  }, []);

  const triggerDownload = async (links: any) => {
    const result = await req.post<{ url: string }>(
      '/api/unsplash/trigger_download',
      {
        download_location: links?.download_location,
      },
    );

    if (result?.url) window.open(result.url, '__blank');
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4 space-x-2">
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

      <Loading loading={loading} error={false} empty={!list?.length}>
        <div className="flex flex-col space-y-4 px-4 pb-4">
          {list?.map(({ id, alt_description, urls, links, user }: any) => {
            return (
              <div
                key={id}
                className="w-full m-auto px-2 pt-2 rounded-md shadow-md"
              >
                <a
                  className="flex items-center justify-center overflow-hidden h-48 relative bg-cover bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${urls?.regular})`,
                  }}
                  href={`${links?.html}?utm_source=Wu&utm_medium=referral`}
                  target="__blank"
                ></a>

                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1 flex space-x-2 items-center justify-start">
                    <p className="text-sm text-gray-400 whitespace-nowrap">
                      Photo by
                    </p>
                    <a
                      href={`${user?.links?.html}?utm_source=Wu&utm_medium=referral whitespace-nowrap`}
                      target="__blank"
                      className="text-sm px-1 text-indigo-400 text-decoration-line"
                    >
                      {user.name}
                    </a>
                    <p className="text-sm text-gray-400 whitespace-nowrap">
                      on
                    </p>
                    <a
                      href="https://unsplash.com/?utm_source=Wu&utm_medium=referral"
                      target="__blank"
                      className="text-sm px-1 text-indigo-400 text-decoration-line"
                    >
                      Unsplash
                    </a>
                  </div>

                  <IconButton
                    icon={<IconDownload />}
                    onClick={() => triggerDownload(links)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Loading>
    </div>
  );
};

export default SearchUnsplash;
