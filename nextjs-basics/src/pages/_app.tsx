import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout/Layout";
import Head from "next/head";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Head>
      <title>NextJS Events</title>
      <meta name="description" content="NextJS Events" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} />
  </Layout>
);

export default App;
