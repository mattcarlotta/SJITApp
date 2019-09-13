import app from "utils/setup";
import { deleteForm } from "controllers/form";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/form", () => ({
  ...require.requireActual("controllers/form"),
  deleteForm: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Delete Form Route", () => {
  it("routes requests to the deleteForm controller", async () => {
    await app()
      .delete("/api/form/delete/1234")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(deleteForm).toHaveBeenCalledTimes(1);
      });
  });
});
