import app from "utils/setup";
import { deleteToken } from "controllers/token";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/token", () => ({
  ...require.requireActual("controllers/token"),
  deleteToken: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Delete Token Route", () => {
  it("routes requests to the deleteToken controller", async () => {
    await app()
      .delete("/api/token/delete/1234")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteToken).toHaveBeenCalledTimes(1);
      });
  });
});
