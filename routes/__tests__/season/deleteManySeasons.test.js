import app from "utils/setup";
import { deleteManySeasons } from "controllers/season";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/season", () => ({
  ...require.requireActual("controllers/season"),
  deleteManySeasons: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Delete Many Seasons Route", () => {
  it("routes requests to the deleteManySeasons controller", async () => {
    await app()
      .delete("/api/seasons/delete-many")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteManySeasons).toHaveBeenCalledTimes(1);
      });
  });
});
