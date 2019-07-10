import app from "utils/setup";
import { deleteTemplate } from "controllers/template";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/template", () => ({
  ...require.requireActual("controllers/template"),
  deleteTemplate: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Delete Template Route", () => {
  it("routes requests to the deleteTemplate controller", async () => {
    await app()
      .delete("/api/template/delete/1234")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteTemplate).toHaveBeenCalledTimes(1);
      });
  });
});
