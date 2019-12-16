import { Event, User } from "models";
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
  let user;
  beforeAll(async () => {
    db = connectDatabase();
    user = await User.findOne({ email: "carlotta.matt@gmail.com" });
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

  it("handles valid update event requests and resets schedule", async () => {
    const seasonId = "20002001";
    const newEvent = {
      callTimes: ["2019-08-09T19:00:00-07:00"],
      eventDate: "2019-08-11T02:30:30.036+00:00",
      eventType: "Promotional",
      team: "San Jose Sharks",
      opponent: "Anaheim Ducks",
      location: "SAP Center at San Jose",
      notes: "",
      seasonId,
      uniform: "Sharks Teal Jersey",
      schedule: [{ employeeIds: [user._id], _id: "2019-08-09T19:00:38-07:00" }],
      scheduledIds: [user._id],
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
      callTimes: ["2019-08-09T18:00:00-07:00"],
    };

    const req = mockRequest(null, null, updatedEventDetails);

    await updateEvent(req, res);

    const updatedEvent = await Event.findOne({ _id: exisitingEvent._id });

    expect(updatedEvent.scheduleIds).toEqual(
      expect.not.arrayContaining(newEvent.scheduledIds),
    );
    expect(updatedEvent.schedule).toEqual(
      expect.not.arrayContaining(newEvent.schedule),
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the event.",
    });
  });

  it("handles valid update event requests and retains schedule", async () => {
    const seasonId = "20002001";
    const newEvent = {
      callTimes: ["2019-09-11T19:00:00-07:00"],
      eventDate: "2019-09-11T02:30:30.036+00:00",
      eventType: "Promotional",
      team: "San Jose Sharks",
      opponent: "Anaheim Ducks",
      location: "SAP Center at San Jose",
      notes: "",
      seasonId,
      uniform: "Sharks Teal Jersey",
      schedule: [{ employeeIds: [user._id], _id: "2019-09-11T19:00:00-07:00" }],
      scheduledIds: [user._id],
    };

    const existingEvent = await Event.create(newEvent);
    await Event.updateOne(
      { _id: existingEvent.id },
      { schedule: newEvent.schedule },
    );

    const updatedEventDetails = {
      ...newEvent,
      _id: existingEvent._id,
      eventType: "Game",
      team: "San Jose Barracuda",
      opponent: "San Diego Gulls",
      location: "Solar4AmericeIce",
      uniform: "Barracuda Jacket",
    };

    const req = mockRequest(null, null, updatedEventDetails);

    await updateEvent(req, res);

    const updatedEvent = await Event.findOne({
      _id: existingEvent._id,
    }).lean();

    expect(updatedEvent.scheduledIds).toEqual(newEvent.scheduledIds);
    expect(updatedEvent.schedule).toEqual(newEvent.schedule);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the event.",
    });
  });
});
