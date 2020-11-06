import React, { memo } from 'react';
import type { HomePageProps } from 'routes/Home/types';

const HomePage = ({ t }: HomePageProps) => (
  <>
    <h1>{t('test')}</h1>
  </>
);

export default memo(HomePage);
