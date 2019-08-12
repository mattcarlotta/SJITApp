import app from "utils/setup";
import { createUser } from "controllers/auth";
import { localSignup } from "services/strategies";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  createUser: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/localSignup", () =>
  jest.fn((req, res, done) => done()),
);

describe("Sign Up Route", () => {
  it("routes requests to the createUser controller", async () => {
    await app()
      .post("/api/signup")
      .then(() => {
        expect(localSignup).toHaveBeenCalledTimes(1);
        expect(createUser).toHaveBeenCalledTimes(1);
      });
  });
});
