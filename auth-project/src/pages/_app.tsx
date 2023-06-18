import { Layout } from "../components/Layout/Layout";
import { Provider } from "next-auth/client";
import "../styles/globals.css";

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) => {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
