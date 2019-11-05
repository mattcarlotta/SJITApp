import { Event } from "models";
import { updateEvent } from "controllers/event";
import {
  invalidUpdateEventRequest,
  mustContainUniqueCallTimes,
  unableToLocateEvent,
} from "shared/authErrors";

describe("Update Event Controller", () => {
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

    await updateEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidUpdateEventRequest,
    });
  });

  it("handles duplicate callTimes", async () => {
    const invalidCallTimes = {
      _id: "5d4e00bcf2d83c45a863e2bc",
      callTimes: ["2019-08-09T19:00:38-07:00", "2019-08-09T19:00:38-07:00"],
      eventDate: "2019-08-11T02:30:30.036+00:00",
      eventType: "Promotional",
      team: "San Jose Sharks",
      opponent: "Anaheim Ducks",
      location: "SAP Center at San Jose",
      notes: "",
      seasonId: "20012002",
      uniform: "Sharks Teal Jersey",
    };

    const req = mockRequest(null, null, invalidCallTimes);

    await updateEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: mustContainUniqueCallTimes,
    });
  });

  it("handles invalid id update requests", async () => {
    const invalidId = {
      _id: "5d4e00bcf2d83c45a863e2bc",
      callTimes: ["2019-08-09T19:00:38-07:00"],
      eventDate: "2019-08-11T02:30:30.036+00:00",
      eventType: "Promotional",
      team: "San Jose Sharks",
      opponent: "Anaheim Ducks",
      location: "SAP Center at San Jose",
      notes: "",
      seasonId: "20012002",
      uniform: "Sharks Teal Jersey",
    };

    const req = mockRequest(null, null, invalidId);

    await updateEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateEvent,
    });
  });

  it("handles valid update event requests", async () => {
    const seasonId = "20002001";
    const newEvent = {
      callTimes: ["2019-08-09T19:00:38-07:00"],
      eventDate: "2019-08-11T02:30:30.036+00:00",
      eventType: "Promotional",
      team: "San Jose Sharks",
      opponent: "Anaheim Ducks",
      location: "SAP Center at San Jose",
      notes: "",
      seasonId,
      uniform: "Sharks Teal Jersey",
    };

    const exisitingEvent = await Event.create(newEvent);

    const updatedEventDetails = {
      ...newEvent,
      _id: exisitingEvent._id,
      eventType: "Game",
      team: "San Jose Barracuda",
      opponent: "San Deigo Gulls",
      location: "Solar4AmericeIce",
      uniform: "Barracuda Jacket",
    };

    const req = mockRequest(null, null, updatedEventDetails);

    await updateEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the event.",
    });
  });
});
