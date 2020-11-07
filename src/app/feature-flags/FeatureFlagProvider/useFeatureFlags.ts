import { useFeatureFlagClient } from './useFeatureFlagClient';
import { Flag } from 'app/feature-flags/FeatureFlagProvider/types';

export const useFeatureFlags = <T extends ReadonlyArray<string> = string[]>(
  ...flags: T
): Record<T[number], Flag> => {
  const client = useFeatureFlagClient();

  const values = client.get(...flags);
  return flags.reduce((map, flag) => {
    map[flag] = {
      value: values[flag],
      isOn: values[flag] === 'on',
    };

    return map;
  }, {}) as Record<T[number], Flag>;
};
