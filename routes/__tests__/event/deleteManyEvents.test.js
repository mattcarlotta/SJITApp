import app from "utils/setup";
import { deleteManyEvents } from "controllers/event";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/event", () => ({
  ...require.requireActual("controllers/event"),
  deleteManyEvents: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Delete Many Events Route", () => {
  it("routes requests to the deleteManyEvents controller", async () => {
    await app()
      .delete("/api/events/delete-many")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteManyEvents).toHaveBeenCalledTimes(1);
      });
  });
});
