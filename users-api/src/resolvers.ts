import { FindOptions, ObjectId } from "mongodb";
import { getUsersCollection } from "./database";
import { User } from "./generated/types";

const createUserResolver = async (
  _: any,
  { user: { pin, ...userArgs } }: any,
  context: any
): Promise<User | null> => {
  console.log("createUserResolver args", userArgs);

  const userCollection = await getUsersCollection();
  const createdUserData = await userCollection.insertOne({ pin, ...userArgs });

  console.log("User created", createdUserData);
  const userId = createdUserData.insertedId;
  const options: FindOptions<Document> = {
    projection: { pin: 0 },
  };
  const user = await userCollection.findOne({ _id: userId }, options);

  console.log("User created", user);
  return user;
};

const getUserResolver = async (
  root: any,
  { id }: any,
  context: any
): Promise<User | null> => {
  console.log("getUserResolver args", root, id);

  const userCollection = await getUsersCollection();
  const options: FindOptions<Document> = {
    projection: { pin: 0 },
  };
  const userId = new ObjectId(id);
  console.log("userid", userId);
  const user = await userCollection.findOne(
    { _id: userId as unknown as string },
    options
  );
  console.log("Returning user", user);
  return user;
};

export const resolvers = {
  Query: {
    hello: () => "Hello World",
    getUser: getUserResolver,
  },
  Mutation: {
    createUser: createUserResolver,
  },
};
