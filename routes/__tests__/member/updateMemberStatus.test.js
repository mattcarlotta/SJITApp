import app from "utils/setup";
import { updateMemberStatus } from "controllers/member";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  updateMemberStatus: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Update A Member Status Route", () => {
  it("routes requests to the updateMemberStatus controller", async () => {
    await app()
      .put("/api/member/updatestatus")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(updateMemberStatus).toHaveBeenCalledTimes(1);
      });
  });
});
