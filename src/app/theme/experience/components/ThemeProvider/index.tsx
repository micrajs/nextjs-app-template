import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <StyledComponentsThemeProvider theme={use('theme')}>{children}</StyledComponentsThemeProvider>
);
