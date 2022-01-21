import { List, Album, Artist, Track } from '@models/spotify';
import { IronSession } from 'iron-session';
import { spotifyGet } from './base';

/**
 * @description 获取歌手信息
 *
 * @param session IronSession
 * @param params
 * @returns Promise<Artist>
 *
 */
export const getSpotifyArtistProfile = (
  session: IronSession,
  params: { artistId: string },
): Promise<Artist> => spotifyGet(session, `/artists/${params.artistId}`);

/**
 * @description 获取歌手最受欢迎的歌曲
 *
 * @param session IronSession
 * @param params
 * @returns Promise<Track[]>
 *
 */
export const getSpotifyArtistTopTracks = (
  session: IronSession,
  params: { id: string; market: string },
): Promise<{ tracks: Track[] }> =>
  spotifyGet(session, `/artists/${params.id}/top-tracks`, {
    market: params.market,
  });

/**
 * @description 获取歌手的专辑
 *
 * @param session IronSession
 * @param params
 * @returns Promise<List<Album>>
 *
 */
export const getSpotifyArtistAlbums = async (
  session: IronSession,
  params: { artistId: string },
): Promise<List<Album>> =>
  spotifyGet(session, `/artists/${params.artistId}/albums`);
