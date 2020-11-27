import React from 'react';

export interface ButtonProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  children?: React.ReactNode;
  className?: string | Record<string, boolean>;
  dataTestId?: string;
  id?: string;
  style?: React.CSSProperties;
}
