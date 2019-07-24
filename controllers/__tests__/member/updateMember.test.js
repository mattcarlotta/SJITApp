import { updateMember } from "controllers/member";

describe("Update Member Controller", () => {
  it("handles valid update member requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    updateMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
