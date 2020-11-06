import { useTranslation } from 'react-i18next';
import type { HomePageProps } from 'routes/Home/types';
import type { PageComponentProps } from 'app/kernel/types';

export const useHomePage = (_props: PageComponentProps): HomePageProps => {
  /**
   * Setup hook
   * This is where the logic to setup the page is done. This hooks
   * is responsible for getting all that the page needs and
   * return an object that will be passed as props.
   */
  const { t } = useTranslation('common');

  return {
    t,
  };
};
