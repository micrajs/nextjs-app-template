/**
 * This is where you can initialize your test environment.
 */
import '../../next-env.d';
import '@testing-library/jest-dom/extend-expect';
import { createNamespace } from 'cls-hooked';
import { app } from '../../src/app/bootstrap';

const testScope = createNamespace('test');
app.container.value('container', app.container);

/**
 * Use
 * Overrides the global use function to check if there is an active test
 * scope. This allows the tests using the `scope` helper to overwrite
 * any service without affecting the global scope.
 */
global.use = <T = any>(namespace: string): T => {
  if (testScope.active) {
    return testScope.get('use')(namespace);
  }
  return app.container.use<T>(namespace);
};

/**
 * Scope
 * This function allows you to write tests that have to modify any global
 * service registered inside the service container without affecting
 * other tests. Simply wrap your test functions inside it.
 */
global.scope = <Args extends Array<any> = []>(callback: (...args: Args) => any) => {
  return async (...args: Args) => {
    return await testScope.runPromise(async () => {
      const scopeContainer = app.container.clone();
      scopeContainer.value('container', scopeContainer);
      testScope.set('use', scopeContainer.use.bind(scopeContainer));
      await callback(...args);
    });
  };
};
