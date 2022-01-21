import { withSessionSsr } from '@lib/session';
import { GetServerSidePropsContext } from 'next';
import { refreshSpotifyToken } from './user';
import { User } from '@models/spotify';

const { SPOTIFY_PLAYER_NAME } = process.env;

export const SpotifyGetServerSideProps = withSessionSsr(
  async ({ req }: GetServerSidePropsContext) => {
    try {
      await refreshSpotifyToken(req.session);
    } catch (err) {
      // 刷新失败
      return {
        redirect: {
          destination: '/spotify',
          permanent: false,
        },
      };
    }

    const { profile, access_token } = req.session?.spotify || {};

    // 无登录记录
    if (!profile) {
      return {
        redirect: {
          destination: '/spotify',
          permanent: false,
        },
      };
    }

    return {
      props: {
        profile,
        access_token,
        SPOTIFY_PLAYER_NAME,
      },
    };
  },
);

export const SpotifyLoginGetServerSideProps = withSessionSsr(
  async ({ req }: GetServerSidePropsContext) => {
    let profile: User | undefined;

    try {
      await refreshSpotifyToken(req.session);

      profile = req.session?.spotify?.profile;
    } catch (err) {
      // 刷新失败
      return {
        redirect: {
          destination: '/spotify',
          permanent: false,
        },
      };
    }

    return { props: { profile: profile || null } };
  },
);
