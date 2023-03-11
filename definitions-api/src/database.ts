const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://root:example@localhost:27017?authSource=admin";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });

mongoClient.connect((err: any) => {
  if (err) {
    console.log("Could not connect to the database definitions-api");
    throw err;
  } else {
    console.log("Connected to database definitions-api");
    seedData(mongoClient);
  }
});

export const getClient: typeof MongoClient = () => {
  return mongoClient;
};

const seedData = async (client: typeof MongoClient) => {
  const db = client.db("definitions");
  const collection = db.collection("ingredients");

  // Check if data has already been seeded
  const count = await collection.count();

  if (count === 0) {
    await collection.insertMany([
      { category: "Dough", categoryId: 1 },
      { category: "Sauce", categoryId: 2 },
      { category: "Cheese", categoryId: 3 },
      { category: "Meet", categoryId: 4 },
      { category: "Vegetables", categoryId: 5 },
      { name: "Thin dough", categoryId: 1 },
      { name: "Traditional dough", categoryId: 1 },
      { name: "Thick dough", categoryId: 1 },
      { name: "Tomato sauce", categoryId: 2 },
      { name: "Garlic sauce", categoryId: 2 },
      { name: "BBQ sauce", categoryId: 2 },
      { name: "Spicy sauce", categoryId: 2 },
      { name: "Gorgonzola", categoryId: 3 },
      { name: "Parmezan", categoryId: 3 },
      { name: "Camembert", categoryId: 3 },
      { name: "Mozarella", categoryId: 3 },
      { name: "Extra cheese", categoryId: 3 },
      { name: "Beef", categoryId: 4 },
      { name: "Ham", categoryId: 4 },
      { name: "Sausage", categoryId: 4 },
      { name: "Chicken", categoryId: 4 },
      { name: "Salami", categoryId: 4 },
      { name: "Pepperoni ", categoryId: 4 },
      { name: "Tuna", categoryId: 4 },
      { name: "Cucumber", categoryId: 5 },
      { name: "Olives", categoryId: 5 },
      { name: "Jalapeno", categoryId: 5 },
      { name: "Spinach", categoryId: 5 },
      { name: "Ananas", categoryId: 5 },
      { name: "Pickled cucumber", categoryId: 5 },
      { name: "Corn", categoryId: 5 },
      { name: "Onion", categoryId: 5 },
      { name: "Red onion", categoryId: 5 },
      { name: "Mushrooms", categoryId: 5 },
      { name: "Pepperoni pepper", categoryId: 5 },
      { name: "Pepper", categoryId: 5 },
      { name: "Tomato", categoryId: 5 },
      { name: "Arugula", categoryId: 5 },
      { name: "Coctail tomato", categoryId: 5 },
    ]);
    console.log("Data seeded successfully");
  } else {
    console.log("Data already seeded");
  }
};

export default { mongoClient };
