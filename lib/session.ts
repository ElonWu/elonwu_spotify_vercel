import { sealData, unsealData } from 'iron-session';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';

const { IRON_PASSWORD, IRON_COOKIE_NAME, NODE_ENV } = process.env;

// session 配置
const sessionOptions = {
  password: IRON_PASSWORD as string,
  cookieName: IRON_COOKIE_NAME as string,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: NODE_ENV === 'production',
    // domain: ''
    // expires: ''
    // maxAge: ''
    // sameSite: ''
  },
};

// 使用 session 的 API
export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
// 使用 session 的 Page
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}

// 生成数据戳, 使用场景如分享携带用户信息的链接时
export async function seal<T>(data: T): Promise<string> {
  return sealData(data, {
    password: IRON_PASSWORD as string,
  });
}

// 解析数据戳
export async function unseal<T>(seal: string): Promise<T> {
  return unsealData(seal, {
    password: IRON_PASSWORD as string,
  });
}
