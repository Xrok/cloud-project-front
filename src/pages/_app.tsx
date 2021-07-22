import type { AppProps } from "next/app";
import { Chakra } from "../theme/Chakra";
import Head from "next/head";

const UnleashApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Chakra>
      <Head>
          <title>UNLEASH</title>
          <link href='https://fonts.googleapis.com/css2?family=Alatsi&display=swap' rel='stylesheet' />
        </Head>
      <Component {...pageProps} />
    </Chakra>
  );
}

export default UnleashApp;