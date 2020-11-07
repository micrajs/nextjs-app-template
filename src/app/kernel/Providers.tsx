import React, { memo, StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import TranslationProvider from 'app/translation/TranslationProvider';
import type { ProvidersProps } from 'app/kernel/types';
import { FeatureFlagProvider } from 'app/feature-flags/FeatureFlagProvider';

const Providers = ({ children }: ProvidersProps) => (
  <StrictMode>
    <ReduxProvider store={use('store/manager').store}>
      <FeatureFlagProvider featureFlags={use('feature-flags')}>
        <ThemeProvider theme={use('theme')}>
          <TranslationProvider>{children}</TranslationProvider>
        </ThemeProvider>
      </FeatureFlagProvider>
    </ReduxProvider>
  </StrictMode>
);

export default memo(Providers);
