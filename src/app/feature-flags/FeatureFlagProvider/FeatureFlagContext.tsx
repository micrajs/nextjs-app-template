import { createContext } from 'react';
import type { FeatureFlags } from 'app/feature-flags/types';

export const FeatureFlagContext = createContext<{ client: FeatureFlags }>({ client: null });
