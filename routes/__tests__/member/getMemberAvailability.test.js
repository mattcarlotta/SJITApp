import app from "utils/setup";
import { getMemberAvailability } from "controllers/member";
import { requireAuth } from "services/strategies";

jest.mock("controllers/member", () => ({
  ...require.requireActual("controllers/member"),
  getMemberAvailability: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Get A Member Route", () => {
  it("routes requests to the getMemberAvailability controller", async () => {
    await app()
      .get("/api/member/availability")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
        expect(getMemberAvailability).toHaveBeenCalledTimes(1);
      });
  });
});
