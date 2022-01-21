import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@lib/session';
import { getSpotifyToken, getSpotifyProfile } from '@services/spotify/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const { code, state } = req.query;

    // 校验存在 code；校验 state 是 login 时生成的随即字符串
    if (!code || req.session?.spotify?.state !== state) {
      res.status(401).json({ message: 'unauthorized' });
      return;
    }

    // 换取 token
    const response = await getSpotifyToken(code as string);
    const data = await response.json();

    if (data?.access_token) {
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
    } else {
      res.status(500).json(data);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export default withSessionRoute(handler);
