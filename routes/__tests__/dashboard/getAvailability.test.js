import app from "utils/setup";
import { getAvailability } from "controllers/dashboard";
import { requireAuth } from "services/strategies";

jest.mock("controllers/dashboard", () => ({
  ...require.requireActual("controllers/dashboard"),
  getAvailability: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Dashboard Get Member Availability Route", () => {
  it("routes requests to the getAvailability controller", async () => {
    await app()
      .get("/api/dashboard/availability")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
        expect(getAvailability).toHaveBeenCalledTimes(1);
      });
  });
});
