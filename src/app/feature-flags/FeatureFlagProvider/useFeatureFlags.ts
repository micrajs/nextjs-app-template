import { Flag } from 'app/feature-flags/FeatureFlagProvider/types';
import { useFeatureFlagClient } from './useFeatureFlagClient';

export const useFeatureFlags = <T extends ReadonlyArray<string> = string[]>(
  ...flags: T
): Record<T[number], Flag> => {
  const client = useFeatureFlagClient();

  const values = client.get(...flags);
  return flags.reduce((map, flag) => {
    return {
      ...map,
      [flag]: {
        value: values[flag],
        isOn: values[flag] === 'on',
      },
    };
  }, {}) as Record<T[number], Flag>;
};
