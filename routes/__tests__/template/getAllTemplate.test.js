import app from "utils/setup";
import { getAllTemplates } from "controllers/template";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/template", () => ({
  ...require.requireActual("controllers/template"),
  getAllTemplates: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get All Templates Route", () => {
  it("routes requests to the getAllTemplates controller", async () => {
    await app()
      .get("/api/templates/all")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getAllTemplates).toHaveBeenCalledTimes(1);
      });
  });
});
