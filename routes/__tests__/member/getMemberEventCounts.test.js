import app from "utils/setup";
import { getMemberEventCounts } from "controllers/member";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  getMemberEventCounts: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get A Member Route", () => {
  it("routes requests to the getMemberEventCounts controller", async () => {
    await app()
      .get("/api/members/eventcounts")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getMemberEventCounts).toHaveBeenCalledTimes(1);
      });
  });
});
