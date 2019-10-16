import app from "utils/setup";
import { resendFormEmail } from "controllers/form";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/form", () => ({
  ...require.requireActual("controllers/form"),
  resendFormEmail: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get A Form Route", () => {
  it("routes requests to the resendFormEmail controller", async () => {
    await app()
      .put("/api/form/resend-email/12345")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(resendFormEmail).toHaveBeenCalledTimes(1);
      });
  });
});
