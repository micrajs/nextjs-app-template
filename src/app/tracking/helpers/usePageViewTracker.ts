import { useEffect } from 'react';
import { useRouter } from 'next/router';

const handleRouteChange = (url: URL) => {
  if (process.browser) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID, {
      page_path: url.pathname,
    });
  }
};

export const usePageViewTracker = () => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};
