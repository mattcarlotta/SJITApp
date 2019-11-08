import app from "utils/setup";
import { getEventDistribution } from "controllers/dashboard";
import { requireAuth } from "services/strategies";

jest.mock("controllers/dashboard", () => ({
  ...require.requireActual("controllers/dashboard"),
  getEventDistribution: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Dashboard Get Event Distribution Route", () => {
  it("routes requests to the getEventDistribution controller", async () => {
    await app()
      .get("/api/dashboard/event-distribution")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
        expect(getEventDistribution).toHaveBeenCalledTimes(1);
      });
  });
});
