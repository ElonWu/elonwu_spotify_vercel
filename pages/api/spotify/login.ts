import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@lib/session';
import { queryParams, generateRandomString } from '@utils/format';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SCOPE, SPOTIFY_CALLBACK_URI } =
  process.env;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const state = generateRandomString(16);

  req.session.spotify = { state };
  await req.session.save();

  const uri =
    'https://accounts.spotify.com/authorize' +
    queryParams({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: SPOTIFY_CLIENT_SCOPE,
      redirect_uri: SPOTIFY_CALLBACK_URI,
      state,
    });

  res.status(200).json({ uri });
};

export default withSessionRoute(handler);
