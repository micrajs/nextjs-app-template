export const restartWithFingerprint = () => {
  const fingerprint = use('tracking/fingerprint');
  if (Boolean(fingerprint)) {
    use('feature-flags').restart({
      core: {
        key: fingerprint,
      },
    });
  } else {
    setTimeout(restartWithFingerprint, 500);
  }
};
