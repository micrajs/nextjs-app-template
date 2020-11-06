import React from 'react';
import * as Sentry from '@sentry/node';
import NextErrorComponent from 'next/error';
import type { NextPageContext } from 'next';
import type { ErrorComponentProps } from 'app/kernel/types';

const ErrorComponent = ({ statusCode, hasGetInitialPropsRun, err }: ErrorComponentProps) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
    Sentry.flush(2000);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

ErrorComponent.getInitialProps = async (context: NextPageContext) => {
  const errorProps = await NextErrorComponent.getInitialProps(context);

  if (context.res?.statusCode === 404) {
    return { ...errorProps, statusCode: 404 };
  }

  if (context.err) {
    Sentry.captureException(context.err);
    await Sentry.flush(2000);

    return {
      hasGetInitialPropsRun: true,
      ...errorProps,
    };
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${context.asPath}`),
  );
  await Sentry.flush(2000);

  return {
    hasGetInitialPropsRun: true,
    ...errorProps,
  };
};

export default ErrorComponent;
