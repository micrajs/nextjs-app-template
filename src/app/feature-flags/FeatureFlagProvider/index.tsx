import React, { useState } from 'react';
import { useIsMounted } from 'helpers/useIsMounted';
import { useIsomorphicEffect } from 'helpers/useIsomorphicEffect';
import { FeatureFlagContext } from 'app/feature-flags/FeatureFlagProvider/FeatureFlagContext';
import type { FeatureFlags } from 'app/feature-flags/types';

export interface FeatureFlagProviderProps {
  children: React.ReactNode;
  featureFlags: FeatureFlags;
}

export const FeatureFlagProvider = ({ children, featureFlags }: FeatureFlagProviderProps) => {
  const isMounted = useIsMounted();
  const [value, setValue] = useState({ client: featureFlags });

  useIsomorphicEffect(
    () =>
      featureFlags.on(
        'UPDATE',
        (client) => {
          if (isMounted) {
            setValue({ client });
          }
        },
      ),
    [featureFlags],
  );

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
