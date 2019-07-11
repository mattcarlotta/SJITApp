import { deleteTeam } from "controllers/team";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Delete Team Controller", () => {
  it("handles valid delete team requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    deleteTeam(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
