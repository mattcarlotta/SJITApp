import app from "utils/setup";
import { deleteSeason } from "controllers/season";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/season", () => ({
  ...require.requireActual("controllers/season"),
  deleteSeason: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Delete Season Route", () => {
  it("routes requests to the deleteSeason controller", async () => {
    await app()
      .delete("/api/season/delete/1234")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteSeason).toHaveBeenCalledTimes(1);
      });
  });
});
