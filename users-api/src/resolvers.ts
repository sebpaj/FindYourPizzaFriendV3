import { FindOptions, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { getUsersCollection } from "./database";
import { User } from "./generated/types";
import { generateToken } from "./auth/auth";
import { GraphQLError } from "graphql";

const createUserResolver = async (
  _: any,
  args: any,
  context: any
): Promise<User | null> => {
  const {
    user: { pin, email, ...userArgs },
  } = args;
  console.log("createUserResolver args", userArgs);

  const userCollection = await getUsersCollection();

  const existingUser = await userCollection.findOne({ email });

  if (existingUser) {
    throw new GraphQLError("User with that email already exists!");
  }

  const hashedPin = await bcrypt.hash(pin.toString(), 10);
  const createdUserData = await userCollection.insertOne({
    pin: hashedPin,
    email,
    ...userArgs,
  });

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

  const userId = new ObjectId(id);

  const user = await userCollection.findOne({
    _id: userId as unknown as string,
  });

  if (!user) {
    throw new GraphQLError(`Can not find user with id ${id}`);
  }

  console.log("Returning user", user);
  return user;
};

const loginMutationResolver = async (
  root: any,
  args: any,
  context: any
): Promise<User | null> => {
  const { email, pin } = args;
  console.log("Login mutation started for", email);

  const userCollection = await getUsersCollection();
  const user = await userCollection.findOne({ email });

  if (!user) {
    throw new GraphQLError(`Can not find user with email ${email}`);
  }

  const pinMatch = await bcrypt.compare(pin.toString(), user.pin);

  if (!pinMatch) {
    throw new GraphQLError("Pin is not correct");
  }

  const token = generateToken(user);

  console.log("Generated token", token);
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
