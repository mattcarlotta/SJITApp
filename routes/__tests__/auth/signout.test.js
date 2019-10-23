import app from "utils/setup";
import { signout } from "controllers/auth";
import { requireRelogin } from "services/strategies";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  signout: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireRelogin", () =>
  jest.fn((req, res, done) => done()),
);

describe("Signout User Route", () => {
  it("routes requests to the signout controller", async () => {
    await app()
      .get("/api/signout")
      .then(() => {
        expect(requireRelogin).toHaveBeenCalledTimes(1);
        expect(signout).toHaveBeenCalledTimes(1);
      });
  });
});
