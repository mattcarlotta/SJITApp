import app from "utils/setup";
import { getAllForms } from "controllers/form";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/form", () => ({
  ...require.requireActual("controllers/form"),
  getAllForms: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get All Forms Route", () => {
  it("routes requests to the getAllForms controller", async () => {
    await app()
      .get("/api/forms/all")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAllForms).toHaveBeenCalledTimes(1);
      });
  });
});
