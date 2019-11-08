import app from "utils/setup";
import { getAPForm } from "controllers/dashboard";
import { requireAuth } from "services/strategies";

jest.mock("controllers/dashboard", () => ({
  ...require.requireActual("controllers/dashboard"),
  getAPForm: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Dashboard Get AP Form Route", () => {
  it("routes requests to the getAPForm controller", async () => {
    await app()
      .get("/api/dashboard/ap-form")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
        expect(getAPForm).toHaveBeenCalledTimes(1);
      });
  });
});
