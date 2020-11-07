import { useFeatureFlagClient } from './useFeatureFlagClient';
import { Flag } from 'app/feature-flags/FeatureFlagProvider/types';

export const useFeatureFlag = (flag: string): Flag => {
  const client = useFeatureFlagClient();

  const value = client.get(flag) as string;
  return {
    value,
    isOn: value === 'on',
  };
};
