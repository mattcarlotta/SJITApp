import app from "utils/setup";
import { getAllTokens } from "controllers/token";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/token", () => ({
  ...require.requireActual("controllers/token"),
  getAllTokens: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get All Tokens Route", () => {
  it("routes requests to the getAllTokens controller", async () => {
    await app()
      .get("/api/tokens/all")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAllTokens).toHaveBeenCalledTimes(1);
      });
  });
});
