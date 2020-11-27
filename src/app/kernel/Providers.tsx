import React, { memo, StrictMode } from 'react';
import { ThemeProvider } from 'app/theme/experience/components/ThemeProvider';
import { StoreProvider } from 'app/store/experience/components/StoreProvider';
import { TranslationProvider } from 'app/translation/experience/components/TranslationProvider';
import type { ProvidersProps } from 'app/kernel/types';

const Providers = ({ children }: ProvidersProps) => (
  <StrictMode>
    <StoreProvider>
      <ThemeProvider>
        <TranslationProvider>{children}</TranslationProvider>
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);

export default memo(Providers);
