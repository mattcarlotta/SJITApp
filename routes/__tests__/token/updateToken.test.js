import app from "utils/setup";
import { updateToken } from "controllers/token";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/token", () => ({
  ...require.requireActual("controllers/token"),
  updateToken: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Update A Token Route", () => {
  it("routes requests to the updateToken controller", async () => {
    await app()
      .put("/api/token/update")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(updateToken).toHaveBeenCalledTimes(1);
      });
  });
});
