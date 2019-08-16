import app from "utils/setup";
import { updateTeam } from "controllers/team";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/team", () => ({
  ...require.requireActual("controllers/team"),
  updateTeam: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Update A Team Route", () => {
  it("routes requests to the updateTeam controller", async () => {
    await app()
      .put("/api/team/update")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(updateTeam).toHaveBeenCalledTimes(1);
      });
  });
});
