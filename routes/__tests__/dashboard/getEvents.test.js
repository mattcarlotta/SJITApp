import app from "utils/setup";
import { getEvents } from "controllers/dashboard";
import { requireAuth } from "services/strategies";

jest.mock("controllers/dashboard", () => ({
  ...require.requireActual("controllers/dashboard"),
  getEvents: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Dashboard Get Member Availability Route", () => {
  it("routes requests to the getEvents controller", async () => {
    await app()
      .get("/api/dashboard/events/today")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
        expect(getEvents).toHaveBeenCalledTimes(1);
      });
  });
});
