import app from "utils/setup";
import { deleteManyMembers } from "controllers/member";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  deleteManyMembers: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Felete Many Members Route", () => {
  it("routes requests to the deleteManyMembers controller", async () => {
    await app()
      .delete("/api/members/delete-many")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteManyMembers).toHaveBeenCalledTimes(1);
      });
  });
});
