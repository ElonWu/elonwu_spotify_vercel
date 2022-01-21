import { withSessionRoute } from '@lib/session';
import { getMySpotifyPlaylist } from '@services/spotify/playlist';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const result = await getMySpotifyPlaylist(req.session, {
    limit: 5,
  });

  try {
    res.status(200).json(result.items);
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
