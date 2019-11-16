import app from "utils/setup";
import { resendToken } from "controllers/token";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/token", () => ({
  ...require.requireActual("controllers/token"),
  resendToken: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Resends A Token Route", () => {
  it("routes requests to the resendToken controller", async () => {
    await app()
      .put("/api/token/resend/1234")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(resendToken).toHaveBeenCalledTimes(1);
      });
  });
});
