"use client";

import { GRAPHQL_ENDPOINT_URL } from "@/constants";
import { HttpLink } from "@apollo/client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT_URL,
    // you can configure the Next.js fetch cache here if you want to
    fetchOptions: { cache: "force-cache" },
    // alternatively you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // ```js
    // const { data } = useSuspenseQuery(
    //   MY_QUERY,
    //   {
    //     context: {
    //       fetchOptions: {
    //         cache: "no-store"
    //       }
    //     }
    //   }
    // );
    // ```
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: httpLink,
  });
}

// you need to create a component to wrap your app in
export function ApolloClientProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
