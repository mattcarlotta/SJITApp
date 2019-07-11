import { updateSeason } from "controllers/season";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Update Season Controller", () => {
  it("handles valid update season requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    updateSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
