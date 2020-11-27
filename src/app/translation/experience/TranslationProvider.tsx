import React from 'react';
import { I18nextProvider } from 'react-i18next';

interface TranslationProviderProps {
  children?: React.ReactNode;
}

const TranslationProvider = ({ children }: TranslationProviderProps) => {
  return <I18nextProvider i18n={use('translation')}>{children}</I18nextProvider>;
};

export default TranslationProvider;
