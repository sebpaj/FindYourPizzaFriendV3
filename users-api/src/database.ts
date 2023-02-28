import { Collection } from "mongodb";
import { User } from "./generated/types";

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://root:example@localhost:27017?authSource=admin";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });

type UserWithPin = User & {
  pin: number;
};

mongoClient.connect((err: any) => {
  if (err) {
    console.log("Could not connect to the database users-api");
    throw err;
  } else {
    console.log("Connected to database users-api");
  }
});

const getClient: typeof MongoClient = () => {
  return mongoClient;
};

const getUsersCollection = async (): Promise<Collection<UserWithPin>> => {
  const client = getClient();
  const db = client.db("users");
  const collection = db.collection("users");
  return collection;
};

export { mongoClient, getUsersCollection };
