import fs from "fs";
import path from "path";

export const typeDefs = fs.readFileSync(path.join("./schema.graphql"), "utf-8");
