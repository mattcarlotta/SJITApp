import { createEvent } from "controllers/event";
import { invalidCreateEventRequest } from "shared/authErrors";

describe("Create Event Controller", () => {
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

  it("handles empty body requests", async () => {
    const emptyBody = {
      callTimes: "",
      eventDate: "",
      eventType: "",
      location: "",
      notes: "",
      opponent: "",
      seasonId: "",
      team: "",
      uniform: "",
    };
    const req = mockRequest(null, null, emptyBody);

    await createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidCreateEventRequest,
    });
  });

  it("handles valid create event requests", async () => {
    const seasonId = "20002001";
    const newEvent = {
      callTimes: ["2019-08-09T19:00:38-07:00"],
      eventDate: "2019-08-11T02:30:30.036+00:00",
      eventType: "Game",
      team: "San Jose Barracuda",
      opponent: "San Diego Gulls",
      location: "SAP Center at San Jose",
      notes: "",
      seasonId,
      uniform: "Barracuda Jersey",
    };

    const req = mockRequest(null, null, newEvent);

    await createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      message: `Successfully added a new event to the ${seasonId} season.`,
    });
  });
});
