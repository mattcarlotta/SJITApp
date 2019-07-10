import app from "utils/setup";
import { createTeam } from "controllers/team";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/team", () => ({
  ...require.requireActual("controllers/team"),
  createTeam: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Create Team Route", () => {
  it("routes requests to the createTeam controller", async () => {
    await app()
      .post("/api/team/create")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(createTeam).toHaveBeenCalledTimes(1);
      });
  });
});
