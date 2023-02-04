import express from "express";
import { createSchema, createYoga } from "graphql-yoga";
import { getClient } from "./database";

const app = express();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      scalar File
      type Category {
        _id: ID!
        name: String!
        categoryId: Int!
      }
      type Ingredient {
        _id: ID!
        name: String!
        categoryId: Int!
      }
      type Query {
        hello: String
        categories: [Category!]!
        ingredients: [Ingredient!]!
      }
      type Mutation {
        getFileName(file: File!): String
      }
      type Subscription {
        countdown(from: Int!): Int!
      }
    `,
    resolvers: {
      Query: {
        hello: () => "world",
        async categories(root, args, context): Promise<any> {
          console.log("In categories resolver");
          const client = getClient();
          const db = client.db("definitions");
          const collection = db.collection("ingredients");
          const categories = await collection
            .find({
              category: { $exists: true },
            })
            .toArray();
          const result = categories.map((c: any) => {
            return {
              _id: c._id,
              name: c.category,
              categoryId: c.categoryId,
            };
          });
          console.log("Returning results from categories resolver", result);
          return result;
        },
        async ingredients(root, args, context): Promise<any> {
          console.log("In ingredients resolver");
          const client = getClient();
          const db = client.db("definitions");
          const collection = db.collection("ingredients");
          const ingredients = await collection
            .find({
              name: { $exists: true },
            })
            .toArray();
          return ingredients;
        },
      },
    },
  }),
  healthCheckEndpoint: "/live",
  context: { mongoClient: getClient() },
});

// Bind GraphQL Yoga to `/graphql` endpoint
app.use("/graphql", yoga);

app.listen(4000, async () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
