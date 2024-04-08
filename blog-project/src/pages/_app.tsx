import Head from "next/head";
import { Layout } from "@/components/UI/Layout/Layout";
import "@/styles/globals.css";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const ComponentWithPageProps = Component as () => JSX.Element;

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ComponentWithPageProps {...pageProps} />
    </Layout>
  );
};

export default App;
