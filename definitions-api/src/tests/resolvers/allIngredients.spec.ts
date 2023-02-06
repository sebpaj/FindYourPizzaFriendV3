import { resolvers } from "../../resolvers";

jest.mock("../../resolvers", () => ({
  resolvers: {
    Query: {
      allIngredients: jest.fn().mockReturnValue([
        { name: "flour", type: "grain" },
        { name: "milk", type: "dairy" },
        { name: "eggs", type: "protein" },
      ]),
    },
  },
}));

describe("allIngredients resolver", () => {
  it("returns a list of ingredients", async () => {
    // Given
    const mockIngredients = [
      { name: "flour", type: "grain" },
      { name: "milk", type: "dairy" },
      { name: "eggs", type: "protein" },
    ];

    // When
    const result = resolvers.Query.allIngredients(null, null, null);

    // Then
    expect(result).toEqual(mockIngredients);
  });
});
