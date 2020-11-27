import React from 'react';
import { Provider } from 'react-redux';

export interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => (
  <Provider store={use('store/manager').store}>{children}</Provider>
);
