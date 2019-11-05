import { Event } from "models";
import { deleteEvent } from "controllers/event";
import { missingEventId, unableToLocateEvent } from "shared/authErrors";

describe("Delete Event Controller", () => {
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

    await deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingEventId,
    });
  });

  it("handles invalid id delete event requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const req = mockRequest(null, null, null, null, { id });

    await deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateEvent,
    });
  });

  it("handles valid delete event requests", async () => {
    const newEvent = {
      callTimes: ["2019-08-09T19:00:38-07:00"],
      eventDate: "2019-08-11T02:30:30.036+00:00",
      eventType: "Game",
      team: "San Jose Sharks",
      oppononet: "Los Angeles Kings",
      location: "SAP Center at San Jose",
      notes: "Bring a dog!",
      seasonId: "20002001",
      uniform: "Barracuda Jersey",
    };

    const createdEvent = await Event.create(newEvent);

    const req = mockRequest(null, null, null, null, { id: createdEvent._id });

    await deleteEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the event.",
    });
  });
});
