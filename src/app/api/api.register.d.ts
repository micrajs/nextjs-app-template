declare module Micra {
  interface Services {
    'api/graphql-client': (endpoint: string) => import('graphql-request').GraphQLClient;
  }

  export interface Config {
    'api': import('app/api/types').ApiConfig;
  }
}
