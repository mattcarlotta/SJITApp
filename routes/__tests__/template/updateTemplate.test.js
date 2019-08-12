import app from "utils/setup";
import { updateTemplate } from "controllers/template";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/template", () => ({
  ...require.requireActual("controllers/template"),
  updateTemplate: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Update A Template Route", () => {
  it("routes requests to the updateTemplate controller", async () => {
    await app()
      .put("/api/template/update/:id")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(updateTemplate).toHaveBeenCalledTimes(1);
      });
  });
});
