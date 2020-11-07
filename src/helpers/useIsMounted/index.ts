import { useRef } from 'react';
import { useIsomorphicEffect } from 'helpers/useIsomorphicEffect';

export const useIsMounted = () => {
  const isMounted = useRef<boolean>(true);

  useIsomorphicEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
};
