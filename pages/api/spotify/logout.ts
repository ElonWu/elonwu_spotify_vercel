import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@lib/session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  req.session.destroy();

  res.status(200).end();
};

export default withSessionRoute(handler);
