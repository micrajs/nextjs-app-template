import dynamic from 'next/dynamic';
import { connect } from 'helpers/connect';
import HomePage from 'routes/Home/HomePage';
import { useHomePage } from 'routes/Home/useHomePage';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  /**
   * This is where you can extend the page's props and
   * define, for instance, the custom meta tags
   * for the page.
   */
  return {
    props: {
      meta: {
        // title?: string;
        // description?: string;
        // robots?: string;
        // cover?: string;
        // type?: string;
      },
    },
  };
};

export default dynamic(async () => {
  /**
   * This is where you can load any modules that
   * are required by the given route, like
   * domains, translations, etc.
   */
  return connect(useHomePage, HomePage);
});
