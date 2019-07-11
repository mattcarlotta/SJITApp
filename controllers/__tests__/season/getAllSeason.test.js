import { getAllSeasons } from "controllers/season";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Get All Seasons Controller", () => {
  it("handles valid get all seasons requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getAllSeasons(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
