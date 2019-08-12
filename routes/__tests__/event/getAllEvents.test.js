import app from "utils/setup";
import { getAllEvents } from "controllers/event";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/event", () => ({
  ...require.requireActual("controllers/event"),
  getAllEvents: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get All Events Route", () => {
  it("routes requests to the getAllEvents controller", async () => {
    await app()
      .get("/api/events/all")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAllEvents).toHaveBeenCalledTimes(1);
      });
  });
});
