import app from "utils/setup";
import { deleteTeam } from "controllers/team";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/team", () => ({
  ...require.requireActual("controllers/team"),
  deleteTeam: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Delete Team Route", () => {
  it("routes requests to the deleteTeam controller", async () => {
    await app()
      .delete("/api/team/delete/1234")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteTeam).toHaveBeenCalledTimes(1);
      });
  });
});
