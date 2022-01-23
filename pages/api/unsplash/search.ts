import { withSessionRoute } from '@lib/session';
import { searchPhotos } from '@services/unsplash/search';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const result = await searchPhotos({ query: req.query.keyword as string });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error || '未知错误' });
  }
};

export default withSessionRoute(handler);
