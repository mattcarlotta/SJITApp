import { Event } from "models";
import { getEvent } from "controllers/event";
import { missingEventId, unableToLocateEvent } from "shared/authErrors";

describe("Get Event Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty params requests", async () => {
    const id = "";
    const req = mockRequest(null, null, null, null, { id });

    await getEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingEventId,
    });
  });

  it("handles invalid get member requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const req = mockRequest(null, null, null, null, { id });

    await getEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateEvent,
    });
  });

  it("handles valid get event requests", async () => {
    const location = "Test Location";
    const existingEvent = await Event.findOne({ location });

    const req = mockRequest(null, null, null, null, { id: existingEvent._id });

    await getEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      event: expect.objectContaining({
        _id: expect.any(ObjectId),
        team: expect.any(String),
        opponent: expect.any(String),
        eventType: expect.any(String),
        location: expect.any(String),
        callTimes: expect.any(Array),
        uniform: expect.any(String),
        seasonId: expect.any(String),
        eventDate: expect.any(Date),
      }),
    });
  });
});
