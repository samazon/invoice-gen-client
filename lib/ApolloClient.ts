import { GRAPHQL_ENDPOINT_URL } from '@/constants';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT_URL,
      // you can configure the Next.js fetch cache here if you want to
      fetchOptions: { cache: 'force-cache' },
    }),
  });
});
