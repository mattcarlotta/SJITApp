import app from "utils/setup";
import { getToken } from "controllers/token";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/token", () => ({
  ...require.requireActual("controllers/token"),
  getToken: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get A Token For Editing Route", () => {
  it("routes requests to the getToken controller", async () => {
    await app()
      .get("/api/token/edit/1234")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getToken).toHaveBeenCalledTimes(1);
      });
  });
});
