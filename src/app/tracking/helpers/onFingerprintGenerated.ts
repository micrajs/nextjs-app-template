export const onFingerprintGenerated = (callback: (fingerprint: string) => void) => {
  if (process.browser) {
    const listener = () => {
      callback(use('tracking/fingerprint'));
      window.removeEventListener('onFingerprint', listener);
    };

    window.addEventListener('onFingerprint', listener);
  }
};
