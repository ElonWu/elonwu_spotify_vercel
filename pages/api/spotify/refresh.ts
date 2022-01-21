import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@lib/session';
// import spotifyAccountRequest from '@services/spotify/account';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } =
  process.env;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  // @ts-ignore
  const refresh_token = req.session.refresh_token;

  // 重新登录
  if (!refresh_token) {
    res.status(401).json({ message: 'no refresh token' });
    return;
  }

  // 刷新 token
  const response: any = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
      ).toString('base64')}`,
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  console.log('spotify refresh response', response);

  req.session.spotify = Object.assign({}, req.session.spotify, {
    access_token: response?.access_token,
  });
  req.session.save();

  res.status(200).json({ message: 'refresh success' });
};

export default withSessionRoute(handler);
