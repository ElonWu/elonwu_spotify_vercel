import { withSessionRoute } from '@lib/session';
import { unsaveSpotifyAlbums } from '@services/spotify/album';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    await unsaveSpotifyAlbums(req.session, {
      ids: req.query.ids as string,
    });

    res.status(200).json({ message: 'success' });
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
