export const onFingerprintGenerated = (callback: (fingerprint: string) => void) => {
  const fingerprint = use('tracking/fingerprint');
  if (Boolean(fingerprint)) {
    callback(fingerprint);
  } else {
    setTimeout(() => {
      onFingerprintGenerated(callback);
    }, 500);
  }
};
