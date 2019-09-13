import app from "utils/setup";
import { updateForm } from "controllers/form";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/form", () => ({
  ...require.requireActual("controllers/form"),
  updateForm: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Update A Form Route", () => {
  it("routes requests to the updateForm controller", async () => {
    await app()
      .put("/api/form/update")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(updateForm).toHaveBeenCalledTimes(1);
      });
  });
});
