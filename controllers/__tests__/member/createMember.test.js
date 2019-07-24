import { createMember } from "controllers/member";

describe("Create Member Controller", () => {
  it("handles valid create member requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    createMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
