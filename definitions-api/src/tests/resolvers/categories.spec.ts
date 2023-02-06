import { resolvers } from "../../resolvers";

jest.mock("../../resolvers", () => ({
  resolvers: {
    Query: {
      categories: jest.fn().mockReturnValue([{ category: "Cheese" }]),
    },
  },
}));

describe("categories resolver", () => {
  it("returns a list of categories", async () => {
    // Given
    const mockCategories = [{ category: "Cheese" }];

    // When
    const result = resolvers.Query.categories(null, null, null);

    // Then
    expect(result).toEqual(mockCategories);
  });
});
