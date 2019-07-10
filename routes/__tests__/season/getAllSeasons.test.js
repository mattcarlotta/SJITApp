import app from "utils/setup";
import { getAllSeasons } from "controllers/season";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/season", () => ({
  ...require.requireActual("controllers/season"),
  getAllSeasons: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get All Seasons Route", () => {
  it("routes requests to the getAllSeasons controller", async () => {
    await app()
      .get("/api/seasons/all")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAllSeasons).toHaveBeenCalledTimes(1);
      });
  });
});
