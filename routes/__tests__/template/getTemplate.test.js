import app from "utils/setup";
import { getTemplate } from "controllers/template";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/template", () => ({
  ...require.requireActual("controllers/template"),
  getTemplate: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get A Template Route", () => {
  it("routes requests to the getTemplate controller", async () => {
    await app()
      .get("/api/template/12345")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getTemplate).toHaveBeenCalledTimes(1);
      });
  });
});
