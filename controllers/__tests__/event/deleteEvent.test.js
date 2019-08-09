import { deleteEvent } from "controllers/event";

describe("Delete Event Controller", () => {
  it("handles valid delete event requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    deleteEvent(req, res);

    // expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
