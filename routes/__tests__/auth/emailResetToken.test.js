import app from "utils/setup";
import { emailResetToken } from "controllers/auth";
import { resetToken } from "services/strategies";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  emailResetToken: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/resetToken", () => jest.fn((req, res, done) => done()));

describe("Email Password Reset Token Route", () => {
  it("routes requests to the emailResetToken controller", async () => {
    await app()
      .put("/api/reset-password")
      .then(() => {
        expect(resetToken).toHaveBeenCalledTimes(1);
        expect(emailResetToken).toHaveBeenCalledTimes(1);
      });
  });
});
