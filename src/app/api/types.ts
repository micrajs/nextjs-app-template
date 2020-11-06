import type { RequestInit } from 'graphql-request/dist/types.dom';

export interface ApiConfig {
  clients: {
    graphql: RequestInit;
  };
}
