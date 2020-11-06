import React from 'react';
import NextApp, { AppContext } from 'next/app';
import Head from 'app/kernel/Head';
import Providers from 'app/kernel/Providers';
import { withRedux } from 'helpers/withRedux';
import type { AppProps } from 'app/kernel/types';
import { usePageViewTracker } from 'app/tracking/helpers/usePageViewTracker';

const App = ({ Component, pageProps, err, router }: AppProps) => {
  usePageViewTracker();

  return (
    <Providers>
      <Head {...pageProps} err={err} router={router} />
      <Component {...pageProps} err={err} router={router} />
    </Providers>
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  // SSR language selector
  use('translation').changeLanguage(
    appContext.router.locale ?? config('translation.defaultLanguage'),
  );

  return NextApp.getInitialProps(appContext);
};

export default withRedux(App);
