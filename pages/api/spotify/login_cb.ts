import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@lib/session';
import { getSpotifyToken, getSpotifyProfile } from '@services/spotify/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { code, state } = req.query;

  if (!code) {
    res.status(401).json({ message: 'unauthorized' });
    return;
  }

  // 换取 token
  const response = await getSpotifyToken(code as string);
  const data = await response.json();

  // 保存鉴权信息

  req.session.spotify = Object.assign({}, req.session.spotify, {
    state,
    last_update: new Date(),
    expires_in: data?.expires_in,
    access_token: data?.access_token,
    refresh_token: data?.refresh_token,
  });
  await req.session.save();

  const user = await getSpotifyProfile(req.session);

  // 保存个人信息
  if (user) {
    req.session.spotify = Object.assign({}, req.session.spotify, {
      profile: user,
    });

    await req.session.save();
  }

  res.redirect('/');
};

export default withSessionRoute(handler);
