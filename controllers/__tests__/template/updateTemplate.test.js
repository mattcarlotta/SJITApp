import { updateTemplate } from "controllers/template";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Update Template Controller", () => {
  it("handles valid update template requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    updateTemplate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
