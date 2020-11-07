import { Flag } from 'app/feature-flags/FeatureFlagProvider/types';
import { useFeatureFlagClient } from './useFeatureFlagClient';

export const useFeatureFlag = (flag: string): Flag => {
  const client = useFeatureFlagClient();

  const value = client.get(flag) as string;
  return {
    value,
    isOn: value === 'on',
  };
};
