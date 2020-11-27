import React, { memo, StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import { StoreProvider } from 'app/store/experience/StoreProvider';
import TranslationProvider from 'app/translation/experience/TranslationProvider';
import type { ProvidersProps } from 'app/kernel/types';

const Providers = ({ children }: ProvidersProps) => (
  <StrictMode>
    <StoreProvider>
      <ThemeProvider theme={use('theme')}>
        <TranslationProvider>{children}</TranslationProvider>
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);

export default memo(Providers);
