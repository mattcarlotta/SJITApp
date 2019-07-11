import { getTeam } from "controllers/team";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Get Team Controller", () => {
  it("handles valid get team requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getTeam(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
