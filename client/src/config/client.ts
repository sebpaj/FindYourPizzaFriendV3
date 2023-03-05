import { ApolloClient, InMemoryCache } from "@apollo/client";
import { USERS_URI } from "./constants";

const client_users = new ApolloClient({
  uri: USERS_URI,
  cache: new InMemoryCache(),
});

export { client_users };
