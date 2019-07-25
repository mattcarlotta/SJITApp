import app from "utils/setup";
import { createMember } from "controllers/member";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  createMember: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Create Member Route", () => {
  it("routes requests to the createMember controller", async () => {
    await app()
      .post("/api/member/create")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(createMember).toHaveBeenCalledTimes(1);
      });
  });
});
