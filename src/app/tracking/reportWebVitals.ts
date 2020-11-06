import type { NextWebVitalsMetric } from 'next/app';

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  console.log(metric);
};
