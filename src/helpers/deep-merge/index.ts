export const deepMerge = <A, B, R = B & A>(target: A, overwrite: B): R => {
  return Object.keys(overwrite).reduce(
    (acc: Partial<R>, key) => {
      const value = overwrite[key];
      const original = target[key];
      const existsAndMatches = original != null && typeof original === typeof value;

      if (existsAndMatches && typeof value === 'object' && value != null && !Array.isArray(value)) {
        acc[key] = deepMerge(original, value);
      } else {
        acc[key] = value;
      }

      return acc;
    },
    { ...target },
  ) as R;
};
