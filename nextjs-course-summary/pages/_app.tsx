import Layout from "../components/Layout/Layout";
import "../styles/globals.css";

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
