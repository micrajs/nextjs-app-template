import { createWrapper } from 'next-redux-wrapper';

export const withRedux = (component: React.ComponentType<any>) => {
  const wrapper = createWrapper(() => use('store/manager').store);

  return wrapper.withRedux(component);
};
