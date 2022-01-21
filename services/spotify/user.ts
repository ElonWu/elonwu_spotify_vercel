import { differenceInMilliseconds, parseISO } from 'date-fns';
import { IronSession } from 'iron-session';

import { User, List, Artist } from '@models/spotify';
import { spotifyGet } from './base';

const SpotifyTokenUri = `https://accounts.spotify.com/api/token`;

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_CALLBACK_URI } =
  process.env;

/**
 * @description 获取 token
 *
 * @param code
 * @returns Promise
 */
export const getSpotifyToken = (code: string) => {
  return fetch(SpotifyTokenUri, {
    method: 'POST',
    // @ts-ignore
    body: new URLSearchParams({
      code,
      redirect_uri: SPOTIFY_CALLBACK_URI,
      grant_type: 'authorization_code',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
      ).toString('base64')}`,
    },
  });
};

/**
 * @description 确保需要更新 token
 *
 * @param session {IronSession}
 * @returns Promise
 */
export const refreshSpotifyToken = async (session: IronSession) => {
  // 确认有基础的 session
  const { last_update, expires_in, refresh_token } = session?.spotify || {};
  if (!last_update || !expires_in) return Promise.resolve();

  // 距离最近一次获取的时间
  const lastUpdatedPast = differenceInMilliseconds(
    new Date(),
    parseISO(last_update),
  );

  // 还未过期
  if (lastUpdatedPast < expires_in * 0.9) return Promise.resolve();

  // 即将或已过期时，刷新 token
  const response = await fetch(SpotifyTokenUri, {
    method: 'POST',
    // @ts-ignore
    body: new URLSearchParams({ refresh_token, grant_type: 'refresh_token' }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
      ).toString('base64')}`,
    },
  });

  const data = await response.json();
  // 更新 session
  session.spotify = Object.assign({}, session.spotify, {
    access_token: data?.access_token,
  });

  await session.save();
};

/**
 * @description 获取个人信息
 *
 * @param session{IronSession}
 * @returns Promise<User>
 *
 */
export const getSpotifyProfile = async (session: IronSession): Promise<User> =>
  spotifyGet(session, '/me');

/**
 * @description 获取关注的歌手
 *
 * @param access_token
 * @param params
 * @returns Promise<{artists: List<Artist>}>
 */
export const getSpotifyFollowArtist = async (
  session: IronSession,
  params?: { limit?: number },
): Promise<{ artists: List<Artist> }> => {
  const query = Object.assign({ type: 'artist' }, params);

  return spotifyGet(session, `/me/following`, query);
};
