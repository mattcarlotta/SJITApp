import app from "utils/setup";
import { updateEvent } from "controllers/event";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/event", () => ({
  ...require.requireActual("controllers/event"),
  updateEvent: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Update An Event Route", () => {
  it("routes requests to the updateEvent controller", async () => {
    await app()
      .put("/api/event/update/:id")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(updateEvent).toHaveBeenCalledTimes(1);
      });
  });
});
