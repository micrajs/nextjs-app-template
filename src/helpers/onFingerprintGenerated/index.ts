export const onFingerprintGenerated = (callback: (fingerprint: string) => void) => {
  const fingerprint = use('tracking/fingerprint');
  if (fingerprint !== '') {
    callback(fingerprint);
  } else {
    setTimeout(() => {
      onFingerprintGenerated(callback);
    }, 500);
  }
};
