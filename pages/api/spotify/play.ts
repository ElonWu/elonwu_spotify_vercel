import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@lib/session';
import { playSpotifyUri, transferSpotifyDevice } from '@services/spotify/track';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const { uri, device_id } = req.body;

    const payload = uri?.startsWith('spotify:track')
      ? {
          device_id,
          uris: [uri],
        }
      : {
          device_id,
          context_uri: uri,
        };

    await playSpotifyUri(req.session, payload);

    // await transferSpotifyDevice(req.session, {
    //   device_ids: [device_id],
    //   play: true,
    // });

    res.status(200).json({ message: 'success' });
  } catch (error: any) {
    console.log({ error });
    res
      .status(error?.status || 400)
      .json({ message: error.message || '未知错误' });
  }
};

export default withSessionRoute(handler);
