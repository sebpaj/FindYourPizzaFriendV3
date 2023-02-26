import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import express from "express";

import { schema } from "./schema";

// Create express app
const app = express();

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema });

// Bind yoga to express server
app.use("/graphql", yoga);

// Start the server and you're done!
app.listen(4001, () => {
  console.info("Server is running on http://localhost:4001/graphql");
});
