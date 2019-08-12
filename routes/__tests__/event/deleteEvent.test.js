import app from "utils/setup";
import { deleteEvent } from "controllers/event";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/event", () => ({
  ...require.requireActual("controllers/event"),
  deleteEvent: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Delete Event Route", () => {
  it("routes requests to the deleteEvent controller", async () => {
    await app()
      .delete("/api/event/delete/1234")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteEvent).toHaveBeenCalledTimes(1);
      });
  });
});
