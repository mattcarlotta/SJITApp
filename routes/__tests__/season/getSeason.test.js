import app from "utils/setup";
import { getSeason } from "controllers/season";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/season", () => ({
  ...require.requireActual("controllers/season"),
  getSeason: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get A Season Route", () => {
  it("routes requests to the getSeason controller", async () => {
    await app()
      .get("/api/season/12345")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getSeason).toHaveBeenCalledTimes(1);
      });
  });
});
