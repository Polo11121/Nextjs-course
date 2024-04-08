import { NextPage } from 'next';
import { ReactElement } from 'react';
import { Layout } from '@/components/UI/Layout/Layout';
import Head from 'next/head';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';

const App: NextPage<AppProps> = ({ Component, pageProps }): ReactElement => (
  <Layout>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Component {...pageProps} />
  </Layout>
);

export default App;
