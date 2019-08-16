import app from "utils/setup";
import { createForm } from "controllers/form";
import { requireStaffRole } from "services/strategies";

jest.mock("controllers/form", () => ({
  ...require.requireActual("controllers/form"),
  createForm: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireStaffRole", () => jest.fn((req, res, done) => done()));

describe("Create Form Route", () => {
  it("routes requests to the createForm controller", async () => {
    await app()
      .post("/api/form/create")
      .then(() => {
        expect(requireStaffRole).toHaveBeenCalledTimes(1);
        expect(createForm).toHaveBeenCalledTimes(1);
      });
  });
});
