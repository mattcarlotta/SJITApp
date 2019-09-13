import app from "utils/setup";
import { updateEventSchedule } from "controllers/event";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/event", () => ({
  ...require.requireActual("controllers/event"),
  updateEventSchedule: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Update An Event Schedule Route", () => {
  it("routes requests to the updateEventSchedule controller", async () => {
    await app()
      .put("/api/event/update/schedule")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(updateEventSchedule).toHaveBeenCalledTimes(1);
      });
  });
});
