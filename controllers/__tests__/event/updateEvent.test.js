import { updateEvent } from "controllers/event";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Update Event Controller", () => {
  it("handles valid update event requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    updateEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
