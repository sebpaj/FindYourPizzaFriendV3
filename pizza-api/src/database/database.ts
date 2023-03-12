import { Collection } from "mongodb";
import { PIZZA } from "../config/constants";

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://root:example@localhost:27017?authSource=admin";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });

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

const getPizzaCollection = async (): Promise<Collection<any>> => {
  const client = getClient();
  const db = client.db(PIZZA);
  const collection = db.collection(PIZZA);
  return collection;
};

export { mongoClient, getPizzaCollection };
