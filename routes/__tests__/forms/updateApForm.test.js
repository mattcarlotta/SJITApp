import app from "utils/setup";
import { updateApForm } from "controllers/form";
import { requireAuth } from "services/strategies";

jest.mock("controllers/form", () => ({
  ...require.requireActual("controllers/form"),
  updateApForm: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Update an AP Form Route", () => {
  it("routes requests to the updateApForm controller", async () => {
    await app()
      .put("/api/form/update/ap")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
        expect(updateApForm).toHaveBeenCalledTimes(1);
      });
  });
});
