export const classNames = (...list: (string | Record<string, boolean>)[]): string =>
  list
    .map((className) => {
      if (typeof className === 'string') {
        return className;
      }

      const classes = Object.keys(className);
      return classes
        .filter((name) => className[name])
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
