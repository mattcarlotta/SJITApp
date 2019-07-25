import app from "utils/setup";
import { getMember } from "controllers/member";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  getMember: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get A Member Route", () => {
  it("routes requests to the getMember controller", async () => {
    await app()
      .get("/api/member/review/0123456789")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getMember).toHaveBeenCalledTimes(1);
      });
  });
});
