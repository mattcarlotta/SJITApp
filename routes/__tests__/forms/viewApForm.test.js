import app from "utils/setup";
import { viewApForm } from "controllers/form";
import { requireAuth } from "services/strategies";

jest.mock("controllers/form", () => ({
  ...require.requireActual("controllers/form"),
  viewApForm: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Get A Form Route", () => {
  it("routes requests to the viewApForm controller", async () => {
    await app()
      .get("/api/form/view/12345")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
        expect(viewApForm).toHaveBeenCalledTimes(1);
      });
  });
});
