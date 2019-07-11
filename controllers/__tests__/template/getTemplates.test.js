import { getTemplate } from "controllers/template";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Get Template Controller", () => {
  it("handles valid get template requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getTemplate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
