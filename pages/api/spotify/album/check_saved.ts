import { withSessionRoute } from '@lib/session';
import { checkSpotifySavedAlbums } from '@services/spotify/album';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  try {
    const result = await checkSpotifySavedAlbums(req.session, {
      ids: req.query.ids as string,
    });

    let data: { [key: string]: boolean } = {};

    (req.query.ids as string).split(',').forEach((id, i) => {
      data[id] = result[i];
    });

    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
