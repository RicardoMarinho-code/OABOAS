import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Plataforma OAB</title>
        <meta
          name="description"
          content="Plataforma de estudos gamificada para a prova da OAB"
        />
        <link rel="icon" href="/favicon.ico" /> 
        <meta name="theme-color" content="#002D72" />
        <link rel="manifest" href="/app.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
