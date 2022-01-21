import { withSessionRoute } from '@lib/session';
import { getSpotifyArtistAlbums } from '@services/spotify/artist';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const albums = await getSpotifyArtistAlbums(req.session, {
      artistId: req.query.artistId as string,
    });

    res.status(200).json(albums.items);
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
