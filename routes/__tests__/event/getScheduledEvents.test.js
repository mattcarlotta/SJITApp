import app from "utils/setup";
import { getScheduledEvents } from "controllers/event";
import { requireAuth } from "services/strategies";

jest.mock("controllers/event", () => ({
  ...require.requireActual("controllers/event"),
  getScheduledEvents: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Get Scheduled Events Route", () => {
  it("routes requests to the getScheduledEvents controller", async () => {
    await app()
      .get("/api/events/schedule")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
        expect(getScheduledEvents).toHaveBeenCalledTimes(1);
      });
  });
});
