import app from "utils/setup";
import { getEventForScheduling } from "controllers/event";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/event", () => ({
  ...require.requireActual("controllers/event"),
  getEventForScheduling: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get An Event For Scheduling Route", () => {
  it("routes requests to the getEventForScheduling controller", async () => {
    await app()
      .get("/api/event/review/12345")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getEventForScheduling).toHaveBeenCalledTimes(1);
      });
  });
});
