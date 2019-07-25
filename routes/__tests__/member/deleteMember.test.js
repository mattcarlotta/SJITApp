import app from "utils/setup";
import { deleteMember } from "controllers/member";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  deleteMember: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Felete Member Route", () => {
  it("routes requests to the deleteMember controller", async () => {
    await app()
      .delete("/api/member/delete/1234567890")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteMember).toHaveBeenCalledTimes(1);
      });
  });
});
