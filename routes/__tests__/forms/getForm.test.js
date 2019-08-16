import app from "utils/setup";
import { getForm } from "controllers/form";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/form", () => ({
  ...require.requireActual("controllers/form"),
  getForm: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Get A Form Route", () => {
  it("routes requests to the getForm controller", async () => {
    await app()
      .get("/api/form/edit/12345")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(getForm).toHaveBeenCalledTimes(1);
      });
  });
});
