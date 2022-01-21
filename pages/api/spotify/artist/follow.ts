import { withSessionRoute } from '@lib/session';
import { getSpotifyFollowArtist } from '@services/spotify/user';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const data = await getSpotifyFollowArtist(req.session);

    res.status(200).json(data.artists.items);
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
