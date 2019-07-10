import app from "utils/setup";
import { createTemplate } from "controllers/template";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/template", () => ({
  ...require.requireActual("controllers/template"),
  createTemplate: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Create Template Route", () => {
  it("routes requests to the createTemplate controller", async () => {
    await app()
      .post("/api/template/create")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(createTemplate).toHaveBeenCalledTimes(1);
      });
  });
});
