import { GraphQLClient } from 'graphql-request';
import { ServiceProvider } from '@micra/service-provider';

export class ApiServiceProvider extends ServiceProvider {
  register() {
    const apiConfig = config('api');

    this.container.value(
      'api/graphql-client',
      (endpoint: string) => new GraphQLClient(endpoint, apiConfig.clients.graphql),
    );
  }
}
