import { Collection } from "mongodb";
import { User } from "./generated/types";
import { USERS } from "./constants";

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://root:example@localhost:27017?authSource=admin";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });

type UserWithPin = User & {
  pin: string;
};

mongoClient.connect((err: any) => {
  if (err) {
    console.log("Could not connect to the database users-api");
    throw err;
  } else {
    console.log("Connected to database users-api");
    createIndexes();
  }
});

const getClient: typeof MongoClient = () => {
  return mongoClient;
};

const getUsersCollection = async (): Promise<Collection<UserWithPin>> => {
  const client = getClient();
  const db = client.db(USERS);
  const collection = db.collection(USERS);
  return collection;
};

const createIndexes = async () => {
  const usersCollection = await getUsersCollection();
  const result = await usersCollection.createIndex(
    { email: 1 },
    { unique: true }
  );
  console.log("Creating index", result);
};

export { mongoClient, getUsersCollection };
