import { createTeam } from "controllers/team";

describe("Delete Team Controller", () => {
  it("handles valid create team requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    createTeam(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
