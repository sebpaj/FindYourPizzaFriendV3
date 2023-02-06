import { getClient } from "./database";
import { Category, Ingredient } from "./generated/types";

export const resolvers = {
  Query: {
    hello: () => "Hello World",
    async categories(root: any, args: any, context: any): Promise<Category[]> {
      console.log("In categories resolver", root);
      const client = getClient();
      const db = client.db("definitions");
      const collection = db.collection("ingredients");
      const categories = await collection
        .find({
          category: { $exists: true },
        })
        .toArray();
      const result = categories.map((c: any) => {
        return {
          _id: c._id,
          name: c.category,
          categoryId: c.categoryId,
        };
      });
      console.log("Returning results from categories resolver", result);
      return result;
    },
    async allIngredients(
      root: any,
      args: any,
      context: any
    ): Promise<Ingredient[]> {
      console.log("In all ingredients resolver");
      const client = getClient();
      const db = client.db("definitions");
      const collection = db.collection("ingredients");
      const ingredients = await collection
        .find({
          name: { $exists: true },
        })
        .toArray();
      return ingredients;
    },
  },
  Category: {
    async ingredients(
      parent: Ingredient,
      root: any,
      args: any,
      context: any
    ): Promise<Ingredient[]> {
      console.log("Resolving ingredients for category:", parent);
      const client = getClient();
      const db = client.db("definitions");
      const collection = db.collection("ingredients");
      const ingredients = await collection
        .find({
          $and: [
            {
              categoryId: parent.categoryId,
            },
            { name: { $exists: true } },
          ],
        })
        .toArray();
      console.log(
        "Returning ingredients for category with result:",
        ingredients
      );
      return ingredients.map((ing: Ingredient) => ({
        id_: ing._id,
        name: ing.name || "Missing Name!",
        categoryId: ing.categoryId,
      }));
    },
  },
  Ingredient: {
    async category(
      parent: Category,
      root: any,
      args: any,
      context: any
    ): Promise<Category> {
      console.log("Resolving category for ingredient", parent);
      const client = getClient();
      const db = client.db("definitions");
      const collection = db.collection("ingredients");
      console.log("Resolving category for ingredient step 2");
      const [category] = await collection
        .find({
          $and: [
            {
              categoryId: parent.categoryId,
            },
            { category: { $exists: true } },
          ],
        })
        .toArray();

      console.log("Returning category", category);

      return { ...category, name: category.category };
    },
  },
};
