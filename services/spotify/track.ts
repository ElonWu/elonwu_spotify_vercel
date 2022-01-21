import { Track } from '@models/spotify';
import { queryParams } from '@utils/format';
import { IronSession } from 'iron-session';
import { spotifyGet, spotifyPut } from './base';

/**
 *
 * @param session {IronSession}
 * @param params
 * @returns Promise<Track>
 *
 * @description 获取歌曲
 */
export const getSpotifyTrack = async (
  session: IronSession,
  params: { id: string },
): Promise<Track> => spotifyGet(session, `/tracks`, params);

/**
 *
 * @param session {IronSession}
 * @param params
 * @returns Promise
 *
 * @description 播放歌曲
 */
export const playSpotifyUri = async (
  session: IronSession,
  params: { device_id: string; uris?: string[]; context_uri?: string },
) => {
  const payload = params?.uris
    ? { uris: params?.uris }
    : { context_uri: params?.context_uri };

  return spotifyPut(
    session,
    `/me/player/play` +
      (params.device_id ? queryParams({ device_id: params.device_id }) : ''),
    payload,
  );
};

/**
 *
 * @param session {IronSession}
 * @param params
 * @returns Promise
 *
 * @description 切换播放设备
 */
export const transferSpotifyDevice = async (
  session: IronSession,
  params: { device_ids: string[]; play?: boolean },
) => spotifyPut(session, `/me/player`, params);
