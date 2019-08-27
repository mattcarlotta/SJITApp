import app from "utils/setup";
import { getMemberEvents } from "controllers/member";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  getMemberEvents: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get A Member Route", () => {
  it("routes requests to the getMemberEvents controller", async () => {
    await app()
      .get("/api/member/events")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getMemberEvents).toHaveBeenCalledTimes(1);
      });
  });
});
