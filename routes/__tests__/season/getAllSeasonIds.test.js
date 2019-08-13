import app from "utils/setup";
import { getAllSeasonIds } from "controllers/season";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/season", () => ({
  ...require.requireActual("controllers/season"),
  getAllSeasonIds: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () =>
  jest.fn((req, res, done) => done()),
);

describe("Get All Seasons Route", () => {
  it("routes requests to the getAllSeasonIds controller", async () => {
    await app()
      .get("/api/seasons/all/ids")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAllSeasonIds).toHaveBeenCalledTimes(1);
      });
  });
});
