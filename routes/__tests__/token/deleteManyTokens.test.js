import app from "utils/setup";
import { deleteManyTokens } from "controllers/token";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/token", () => ({
  ...require.requireActual("controllers/token"),
  deleteManyTokens: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Delete Many Tokens Route", () => {
  it("routes requests to the deleteManyTokens controller", async () => {
    await app()
      .delete("/api/tokens/delete-many")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteManyTokens).toHaveBeenCalledTimes(1);
      });
  });
});
