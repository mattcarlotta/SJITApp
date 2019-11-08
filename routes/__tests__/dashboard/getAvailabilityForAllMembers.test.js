import app from "utils/setup";
import { getAvailabilityForAllMembers } from "controllers/dashboard";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/dashboard", () => ({
  ...require.requireActual("controllers/dashboard"),
  getAvailabilityForAllMembers: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Dashboard Get All Members Availability Route", () => {
  it("routes requests to the getAvailabilityForAllMembers controller", async () => {
    await app()
      .get("/api/dashboard/membersavailability")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAvailabilityForAllMembers).toHaveBeenCalledTimes(1);
      });
  });
});
