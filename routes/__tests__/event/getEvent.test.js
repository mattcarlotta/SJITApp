import app from "utils/setup";
import { getEvent } from "controllers/event";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/event", () => ({
  ...require.requireActual("controllers/event"),
  getEvent: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get An Event Route", () => {
  it("routes requests to the getEvent controller", async () => {
    await app()
      .get("/api/event/12345")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getEvent).toHaveBeenCalledTimes(1);
      });
  });
});
