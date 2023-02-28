import { FindOptions, ObjectId } from "mongodb";
import sign from "jsonwebtoken";
import { getUsersCollection } from "./database";
import { User } from "./generated/types";
import { generateToken } from "./auth/auth";

const createUserResolver = async (
  _: any,
  args: any,
  context: any
): Promise<User | null> => {
  const {
    user: { pin, ...userArgs },
  } = args;
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
  args: any,
  context: any
): Promise<User | null> => {
  const { id } = args;
  console.log("getUserResolver args", root, id);

  const userCollection = await getUsersCollection();
  const options: FindOptions<Document> = {
    projection: { pin: 0 },
  };
  const userId = new ObjectId(id);

  const user = await userCollection.findOne(
    { _id: userId as unknown as string },
    options
  );
  console.log("Returning user", user);
  return user;
};

const loginMutationResolver = async (
  root: any,
  args: any,
  context: any
): Promise<User | null> => {
  const { email, pin } = args;
  console.log("login mutation started for", email);

  const userCollection = await getUsersCollection();
  const user = await userCollection.findOne({ email });

  if (!user) {
    throw new Error("Invalid login");
  }
  const pinMatch = pin === user.pin;

  if (!pinMatch) {
    throw new Error("Invalid login");
  }

  const token = generateToken(user);

  return { ...user, token };
};

export const resolvers = {
  Query: {
    hello: () => "Hello World",
    getUser: getUserResolver,
  },
  Mutation: {
    createUser: createUserResolver,
    login: loginMutationResolver,
  },
};
