import { withSessionRoute } from '@lib/session';
import { getSpotifyArtistTopTracks } from '@services/spotify/artist';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const data = await getSpotifyArtistTopTracks(req.session, {
      id: req.query.artistId as string,
      market: req.session?.spotify?.profile?.country as string,
    });
    res.status(200).json(data.tracks);
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
