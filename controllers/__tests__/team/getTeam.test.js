import { getTeam } from "controllers/team";

describe("Get Team Controller", () => {
  it("handles valid get team requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getTeam(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
