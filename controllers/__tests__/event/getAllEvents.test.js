import { getAllEvents } from "controllers/event";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Get All Events Controller", () => {
  it("handles valid get all events requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    getAllEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
