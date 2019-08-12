import { getAllEvents } from "controllers/event";

describe("Get All Events Controller", () => {
  it("handles valid get all events requests", async () => {
    const res = mockResponse();
    const req = mockRequest();

    await getAllEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      events: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          league: expect.any(String),
          eventType: expect.any(String),
          location: expect.any(String),
          callTimes: expect.any(Array),
          uniform: expect.any(String),
          seasonId: expect.any(String),
          eventDate: expect.any(Date),
        }),
      ]),
    });
  });
});
