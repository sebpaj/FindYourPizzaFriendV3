import express from "express";
import { createSchema, createYoga } from "graphql-yoga";

import { getClient } from "./database";
import { resolvers } from "./resolvers";
import { typeDefs } from "./types";

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  healthCheckEndpoint: "/live",
  context: { mongoClient: getClient() },
});

// Create express server
const app = express();

// Bind GraphQL Yoga to `/graphql` endpoint
app.use("/graphql", yoga);

app.listen(4000, async () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
