import app from "utils/setup";
import { createEvent } from "controllers/event";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/event", () => ({
  ...require.requireActual("controllers/event"),
  createEvent: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Create Event Route", () => {
  it("routes requests to the createEvent controller", async () => {
    await app()
      .post("/api/event/create")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(createEvent).toHaveBeenCalledTimes(1);
      });
  });
});
