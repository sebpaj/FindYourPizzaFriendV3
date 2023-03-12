import { CreatePizzaResult } from "../generated/types";

const createPizzaResolver = async (
  _: any,
  args: any,
  context: any
): Promise<CreatePizzaResult> => {
  console.log("Starting createPizzaResolver with args", args);
  return { __typename: "Error", errorMessage: "error" };
};

export const Mutation = {
  createPizza: createPizzaResolver,
};
