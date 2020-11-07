import { useContext } from 'react';
import { FeatureFlagContext } from './FeatureFlagContext';

export const useFeatureFlagClient = () => useContext(FeatureFlagContext).client;
