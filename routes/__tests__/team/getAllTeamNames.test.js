import app from "utils/setup";
import { getAllTeamNames } from "controllers/team";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/team", () => ({
  ...require.requireActual("controllers/team"),
  getAllTeamNames: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () =>
  jest.fn((req, res, done) => done()),
);

describe("Get All Team Names Route", () => {
  it("routes requests to the getAllTeamNames controller", async () => {
    await app()
      .get("/api/teams/all/names")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAllTeamNames).toHaveBeenCalledTimes(1);
      });
  });
});
