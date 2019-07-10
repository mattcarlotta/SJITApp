import app from "utils/setup";
import { updateSeason } from "controllers/season";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/season", () => ({
  ...require.requireActual("controllers/season"),
  updateSeason: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Update A Season Route", () => {
  it("routes requests to the updateSeason controller", async () => {
    await app()
      .put("/api/season/update/:id")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(updateSeason).toHaveBeenCalledTimes(1);
      });
  });
});
