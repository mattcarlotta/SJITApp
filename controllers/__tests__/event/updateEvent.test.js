import { updateEvent } from "controllers/event";

describe("Update Event Controller", () => {
  it("handles valid update event requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    updateEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
