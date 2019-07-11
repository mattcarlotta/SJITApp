import { getAllTeams } from "controllers/team";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Get All Teams Controller", () => {
  it("handles valid get all teams requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getAllTeams(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
