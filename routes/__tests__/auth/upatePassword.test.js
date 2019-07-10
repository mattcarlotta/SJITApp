import app from "utils/setup";
import { updatePassword } from "controllers/auth";
import { newPassword } from "services/strategies";

jest.mock("controllers/auth", () => ({
  ...require.requireActual("controllers/auth"),
  updatePassword: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/newPassword", () => jest.fn((req, res, done) => done()));

describe("Update User Password Route", () => {
  it("routes requests to the updatePassword controller", async () => {
    await app()
      .put("/api/new-password")
      .then(() => {
        expect(newPassword).toHaveBeenCalledTimes(1);
        expect(updatePassword).toHaveBeenCalledTimes(1);
      });
  });
});
