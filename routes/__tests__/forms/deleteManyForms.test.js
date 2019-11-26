import app from "utils/setup";
import { deleteManyForms } from "controllers/form";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/form", () => ({
  ...require.requireActual("controllers/form"),
  deleteManyForms: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Delete Many Forms Route", () => {
  it("routes requests to the deleteManyForms controller", async () => {
    await app()
      .delete("/api/forms/delete-many")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteManyForms).toHaveBeenCalledTimes(1);
      });
  });
});
