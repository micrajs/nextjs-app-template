import React, { memo } from 'react';

export function connect<P = unknown, CP = unknown>(
  setup: (props: P) => CP,
  Component: React.ComponentType<CP>,
) {
  return memo(function ConnectedComponent(props: P) {
    return <Component {...props} {...setup(props)} />;
  });
}
