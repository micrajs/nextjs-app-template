import React, { memo, useMemo } from 'react';
import NextHead from 'next/head';
import { Router } from 'next/router';
import { useTranslation } from 'react-i18next';
import { PageComponentProps } from 'app/kernel/types';

const Head = ({ meta, router }: PageComponentProps) => {
  const { t } = useTranslation();

  const { title, canonical, description, url, name, cover, robots, type } = useMemo(
    () => ({
      canonical: config('app.url'),
      cover: meta?.cover || config('app.coverImage', '/images/cover.png'),
      robots: meta?.robots || config('app.robots', 'index, follow'),
      name: t(['app.name', config('app.name')]),
      url: `${config('app.url')}${router.pathname}`,
      type: meta?.type ? t(meta.type) : t(['app.type', config('app.type')]),
      title: `${meta?.title ? `${t(meta.title)} | ` : ''}${t(['app.name', config('app.name')])}`,
      description: meta?.description
        ? t(meta.description)
        : t(['app.description', config('app.description', config('app.name'))]),
    }),
    [meta],
  );

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={cover} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={name} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={cover} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, minimal-ui"
      />
    </NextHead>
  );
};

export default memo(Head);
