import { createTemplate } from "controllers/template";

describe("Delete Template Controller", () => {
  it("handles valid create template requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    createTemplate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
