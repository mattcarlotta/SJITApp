import app from "utils/setup";
import { getAllMembers } from "controllers/member";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  getAllMembers: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get All members Route", () => {
  it("routes requests to the getAllMembers controller", async () => {
    await app()
      .get("/api/members/all")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAllMembers).toHaveBeenCalledTimes(1);
      });
  });
});
