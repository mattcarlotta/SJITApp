import { getMember } from "controllers/member";

describe("Get Member Controller", () => {
  it("handles valid get member requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
