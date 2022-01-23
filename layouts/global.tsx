import Head from 'next/head';
import Sctipt from 'next/script';
import { NextPage } from 'next';
import { ReactNode } from 'react';

export interface ThirdScript {
  src?: string;
  strategy?: any;
  onLoad?: () => void;
  dangerouslySetInnerHTML?: { __html: string };
}

const GlobalLayout: NextPage<{
  title: string;
  scripts?: ThirdScript[];
  children?: ReactNode;
}> = ({ title, children, scripts = [] }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {scripts.map((options) => (
        <Sctipt key={JSON.stringify(options)} {...options} />
      ))}

      {children}
    </>
  );
};

export default GlobalLayout;
