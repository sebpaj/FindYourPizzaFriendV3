import { resolvers } from "../../resolvers";

jest.mock("../../resolvers", () => ({
  resolvers: {
    Query: {
      hello: jest.fn().mockReturnValue("Hello World!"),
    },
  },
}));

describe("Hello resolver", () => {
  it('returns "Hello World!"', async () => {
    const result = resolvers.Query.hello();
    expect(result).toBe("Hello World!");
  });
});
