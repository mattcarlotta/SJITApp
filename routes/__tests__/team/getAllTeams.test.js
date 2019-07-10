import app from "utils/setup";
import { getAllTeams } from "controllers/team";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/team", () => ({
  ...require.requireActual("controllers/team"),
  getAllTeams: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get All Teams Route", () => {
  it("routes requests to the getAllTeams controller", async () => {
    await app()
      .get("/api/teams/all")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAllTeams).toHaveBeenCalledTimes(1);
      });
  });
});
