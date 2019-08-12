import app from "utils/setup";
import { createSeason } from "controllers/season";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/season", () => ({
  ...require.requireActual("controllers/season"),
  createSeason: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Create Season Route", () => {
  it("routes requests to the createSeason controller", async () => {
    await app()
      .post("/api/season/create")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(createSeason).toHaveBeenCalledTimes(1);
      });
  });
});
