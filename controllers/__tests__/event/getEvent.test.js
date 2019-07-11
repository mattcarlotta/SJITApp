import { getEvent } from "controllers/event";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Get Event Controller", () => {
  it("handles valid get event requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
