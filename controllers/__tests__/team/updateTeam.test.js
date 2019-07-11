import { updateTeam } from "controllers/team";

describe("Update Team Controller", () => {
  it("handles valid update team requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    updateTeam(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
