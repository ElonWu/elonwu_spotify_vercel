import { List, Playlist, Track } from '@models/spotify';
import { IronSession } from 'iron-session';
import { spotifyGet } from './base';

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<Playlist[]>
 *
 * @description 获取我的播放列表
 */
export const getMySpotifyPlaylist = async (
  session: IronSession,
  params: { limit?: number; offset?: number },
): Promise<List<Playlist>> => spotifyGet(session, `/me/playlists`, params);

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<Playlist>
 *
 * @description 获取我的播放列表
 */
export const getSpotifyPlaylistDetail = async (
  session: IronSession,
  params: { id: string },
): Promise<Playlist> => spotifyGet(session, `/playlists/${params.id}`);

/**
 *
 * @param access_token
 * @param params
 * @returns Promise<List<Track>>
 *
 * @description 获取近期播放
 */
export const getSpotifyRecently = async (
  session: IronSession,
  params: { limit?: number; offset?: number },
): Promise<List<Track>> =>
  spotifyGet(session, `/me/player/recently-played`, params);
