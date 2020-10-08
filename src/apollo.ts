import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://movieql.netlify.app/graphql"
      : "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default client;
