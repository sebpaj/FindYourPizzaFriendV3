import express from "express";
import { createSchema, createYoga } from "graphql-yoga";
import path from "path";

import { resolve } from "path";
import { promises as fs } from "fs";

const publicPath = resolve("public/images");

const getRandomImage = async (): Promise<{
  name: String;
  data: String;
}> => {
  const files = await fs.readdir(publicPath);
  // filter only image files
  const imageFiles = files.filter((file) =>
    [".jpg", ".jpeg", ".png", ".gif"].includes(path.extname(file))
  );
  // pick a random image
  const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  console.log("my random image is", randomImage);
  const data = await fs.readFile(resolve(publicPath, randomImage), "utf-8");
  return { name: randomImage, data };
};

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Image {
      name: String!
      data: String!
    }
    type Query {
      hello: String
      getImage: Image!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "world",
      getImage: () => getRandomImage(),
    },
  },
});

const app = express();

const yoga = createYoga({
  schema,
});

// Bind GraphQL Yoga to `/graphql` endpoint
app.use("/graphql", yoga);

app.listen(4001, () => {
  console.log("Running a GraphQL API server at http://localhost:4001/graphql");
});
