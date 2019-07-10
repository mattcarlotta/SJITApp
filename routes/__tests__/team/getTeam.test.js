import app from "utils/setup";
import { getTeam } from "controllers/team";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/team", () => ({
  ...require.requireActual("controllers/team"),
  getTeam: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get A Team Route", () => {
  it("routes requests to the getTeam controller", async () => {
    await app()
      .get("/api/team/12345")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getTeam).toHaveBeenCalledTimes(1);
      });
  });
});
