import React, { memo, StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import TranslationProvider from 'app/translation/experience/TranslationProvider';
import type { ProvidersProps } from 'app/kernel/types';

const Providers = ({ children }: ProvidersProps) => (
  <StrictMode>
    <ReduxProvider store={use('store/manager').store}>
      <ThemeProvider theme={use('theme')}>
        <TranslationProvider>{children}</TranslationProvider>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);

export default memo(Providers);
