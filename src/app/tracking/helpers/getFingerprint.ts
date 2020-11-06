import type { Application } from '@micra/core';

export const getFingerprint = async (container: Application['container']) => {
  if (process.browser) {
    const FingerprintJS = await import('@fingerprintjs/fingerprintjs');
    const fingerprint = await FingerprintJS.load();
    const { visitorId } = await fingerprint.get();
    container.value('tracking/fingerprint', visitorId);
  }
};
