import { createEvent } from "controllers/event";

describe("Create Event Controller", () => {
  it("handles valid create event requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
