import app from "utils/setup";
import { signin } from "controllers/auth";
import { localLogin } from "services/strategies";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  signin: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/localLogin", () => jest.fn((req, res, done) => done()));

describe("Signin User Route", () => {
  it("routes requests to the signin controller", async () => {
    await app()
      .post("/api/signin")
      .then(() => {
        expect(localLogin).toHaveBeenCalledTimes(1);
        expect(signin).toHaveBeenCalledTimes(1);
      });
  });
});
