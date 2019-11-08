import { getAllEvents } from "controllers/event";

describe("Get All Events Controller", () => {
  it("handles valid get all events requests", async () => {
    const res = mockResponse();
    const req = mockRequest(null, null, null, { page: "1" });

    await getAllEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      events: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          callTimes: expect.any(Array),
          employeeResponses: expect.any(Array),
          eventDate: expect.any(Date),
          eventType: expect.any(String),
          id: expect.any(String),
          location: expect.any(String),
          notes: expect.any(String),
          opponent: expect.any(String),
          scheduledIds: expect.any(Array),
          seasonId: expect.any(String),
          sentEmailReminders: expect.any(Boolean),
          team: expect.any(String),
          uniform: expect.any(String),
        }),
      ]),
      totalDocs: expect.any(Number),
    });
  });
});
