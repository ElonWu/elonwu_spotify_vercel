import {
  SpotifySerchType,
  SearchResult,
  SearchResultReponse,
} from '@models/spotify';

import { IronSession } from 'iron-session';
import { spotifyGet } from './base';

/**
 *
 * @param session {IronSession}
 * @param params
 * @returns Promise<SearchResultReponse>
 *
 * @description 获取歌曲
 */
export const searchSpotify = async (
  session: IronSession,
  params: {
    q?: string;
    type?: SpotifySerchType[];
    limit?: number;
    offset?: number;
  },
): Promise<SearchResultReponse> => {
  const search = await spotifyGet<SearchResult>(session, `/search`, params);
  return {
    album: {
      type: 'album',
      list: search?.albums?.items || [],
    },
    artist: {
      type: 'artist',
      list: search?.artists?.items || [],
    },
    playlist: {
      type: 'playlist',
      list: search?.playlists?.items || [],
    },
    track: {
      type: 'track',
      list: search?.tracks?.items || [],
    },
    // TODO 之后再开发
    // show: {
    //   type: 'show',
    //   list: search?.shows?.items || [],
    // },
    // episode: {
    //   type: 'episode',
    //   list: search?.episodes?.items || [],
    // },
  };
};
