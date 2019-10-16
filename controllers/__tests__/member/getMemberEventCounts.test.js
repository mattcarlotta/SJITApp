import { Event } from "models";
import { getMemberEventCounts } from "controllers/member";
import { missingEventId, unableToLocateEvent } from "shared/authErrors";

describe("Get Member Events Counts Controller", () => {
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

  it("handles empty query requests", async () => {
    const eventId = "";
    const req = mockRequest(null, null, null, { eventId });

    await getMemberEventCounts(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingEventId,
    });
  });

  it("handles invalid event id requests", async () => {
    const eventId = "5d5b5ee857a6d20abf49db19";
    const req = mockRequest(null, null, null, { eventId });

    await getMemberEventCounts(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateEvent,
    });
  });

  it("handles valid get member events counts requests", async () => {
    const existingEvent = await Event.findOne({
      opponent: "Los Angeles Kings",
    });

    const eventId = existingEvent._id;

    const req = mockRequest(null, null, null, { eventId });

    await getMemberEventCounts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      members: expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          "Event Count": expect.any(Number),
        }),
      ]),
    });
  });
});
