import { deleteEvent } from "controllers/event";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Delete Event Controller", () => {
  it("handles valid delete event requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
