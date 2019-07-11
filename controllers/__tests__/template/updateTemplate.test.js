import { updateTemplate } from "controllers/template";

describe("Update Template Controller", () => {
  it("handles valid update template requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    updateTemplate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
