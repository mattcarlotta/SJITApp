import app from "utils/setup";
import { resendEventEmail } from "controllers/event";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/event", () => ({
  ...require.requireActual("controllers/event"),
  resendEventEmail: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get Scheduled Events Route", () => {
  it("routes requests to the resendEventEmail controller", async () => {
    await app()
      .put("/api/event/resend-email/123")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(resendEventEmail).toHaveBeenCalledTimes(1);
      });
  });
});
