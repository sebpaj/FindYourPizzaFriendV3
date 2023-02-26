import { getUsersCollection } from "./database";

const createUserResolver = async (root: any, args: any, context: any) => {
  console.log("Received data root", root);
  console.log("Received data args", args);

  const userCollection = await getUsersCollection();
  const createdUserData = await userCollection.insertOne({ ...args.user });

  console.log("User created", createdUserData);
  const userId = createdUserData.insertedId;
  const user = await userCollection.findOne({ _id: userId });

  console.log("User data", user);
  return user;
};

export const resolvers = {
  Query: {
    hello: () => "Hello World",
  },
  Mutation: {
    createUser: createUserResolver,
  },
};
