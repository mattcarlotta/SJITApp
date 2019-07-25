import app from "utils/setup";
import { updateMember } from "controllers/member";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  updateMember: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Update A Member Route", () => {
  it("routes requests to the updateMember controller", async () => {
    await app()
      .put("/api/member/update")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(updateMember).toHaveBeenCalledTimes(1);
      });
  });
});
