import type { AppProps } from 'next/app';

import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return typeof window === 'undefined' ? null : <Component {...pageProps} />;
}

export default MyApp;
