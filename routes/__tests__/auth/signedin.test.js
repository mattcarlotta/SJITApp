import app from "utils/setup";
import { signedin } from "controllers/auth";
import { requireRelogin } from "services/strategies";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  signedin: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireRelogin", () => jest.fn((req, res, done) => done()));

describe("Signedin User Route", () => {
  it("routes requests to the signedin controller", async () => {
    await app()
      .get("/api/signedin")
      .then(() => {
        expect(requireRelogin).toHaveBeenCalledTimes(1);
        expect(signedin).toHaveBeenCalledTimes(1);
      });
  });
});
