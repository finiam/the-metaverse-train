import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/zepedroresende/metaverse-train",
  cache: new InMemoryCache(),
});
