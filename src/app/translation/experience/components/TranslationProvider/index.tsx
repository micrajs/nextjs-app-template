import React from 'react';
import { I18nextProvider } from 'react-i18next';

interface TranslationProviderProps {
  children?: React.ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => (
  <I18nextProvider i18n={use('translation')}>{children}</I18nextProvider>
);
