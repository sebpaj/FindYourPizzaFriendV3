import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema/schema";

const app = express();

const yoga = createYoga({
  schema,
});

// Bind GraphQL Yoga to `/graphql` endpoint
app.use("/graphql", yoga);

app.listen(4002, () => {
  console.log("Running a GraphQL API server at http://localhost:4002/graphql");
});
