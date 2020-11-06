import type { NextWebVitalsMetric } from 'next/app';

/**
 * Web Vitals
 * Web Vitals provide quality signals that are essential to delivering
 * a great user experience on the web. They help you quantify the
 * experience of your site and identify opportunities to improve.
 */
export const reportWebVitals = ({ id, name, label, value }: NextWebVitalsMetric) => {
  /**
   * Here we are sending the vitals to Google Analytics in the form
   * of GA events. This allows you to track and monitor
   * these signals through the GA dashboard.
   */
  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  });
};
