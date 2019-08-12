import app from "utils/setup";
import { createToken } from "controllers/token";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/token", () => ({
  ...require.requireActual("controllers/token"),
  createToken: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Create Token Route", () => {
  it("routes requests to the createToken controller", async () => {
    await app()
      .post("/api/token/create")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(createToken).toHaveBeenCalledTimes(1);
      });
  });
});
