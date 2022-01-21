import { SpotifyError } from '@models/spotify';
import { IronSession } from 'iron-session';
import { queryParams } from '@utils/format';
import { refreshSpotifyToken } from './user';

const SpotifyBase = `https://api.spotify.com/v1`;

/**
 *
 * @param spotifySession
 * @param params
 * @returns Promise<T>
 *
 * @description 请求 spotify
 */

function spotifyRequest<T>(
  session: IronSession,
  method: string,
  url: string,
  body?: any,
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    await refreshSpotifyToken(session);

    const uri = `${SpotifyBase}${url}`;
    const access_token = session?.spotify?.access_token;

    const payload: RequestInit = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    };
    if (body) payload.body = JSON.stringify(body);

    try {
      const response = await fetch(uri, payload);

      const contentType = response.headers.get('content-type');

      console.log({
        uri,
        access_token,
        body,
        method,
        resContentType: contentType,
      });

      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data: T & SpotifyError = await response.json();

        if (data?.error) {
          reject(data.error);
        } else {
          resolve(data);
        }
      } else {
        const result = await response.text();
        // console.log({ response });
        resolve(result as any);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function spotifyGet<T>(
  session: IronSession,
  url: string,
  query?: any,
): Promise<T> {
  return spotifyRequest(session, 'GET', url + queryParams(query));
}

export function spotifyPost<T>(
  session: IronSession,
  url: string,
  body?: any,
): Promise<T> {
  return spotifyRequest(session, 'POST', url, body);
}

export function spotifyDelete<T>(
  session: IronSession,
  url: string,
  body?: any,
): Promise<T> {
  return spotifyRequest(session, 'DELETE', url, body);
}

export function spotifyPut<T>(
  session: IronSession,
  url: string,
  body?: any,
): Promise<T> {
  return spotifyRequest(session, 'PUT', url, body);
}
