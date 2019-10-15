import app from "utils/setup";
import { getAllMemberNames } from "controllers/member";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  getAllMemberNames: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get All members Route", () => {
  it("routes requests to the getAllMemberNames controller", async () => {
    await app()
      .get("/api/members/names")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAllMemberNames).toHaveBeenCalledTimes(1);
      });
  });
});
