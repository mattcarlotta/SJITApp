import app from "utils/setup";
import { create } from "controllers/auth";
import { localSignup } from "services/strategies";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  create: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/localSignup", () => jest.fn((req, res, done) => done()));

describe("Sign Up Route", () => {
  it("routes requests to the create controller", async () => {
    await app()
      .post("/api/signup")
      .then(() => {
        expect(localSignup).toHaveBeenCalledTimes(1);
        expect(create).toHaveBeenCalledTimes(1);
      });
  });
});
