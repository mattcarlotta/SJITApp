import { Event, User } from "models";
import { updateEventSchedule } from "controllers/event";
import {
  invalidUpdateEventRequest,
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
      _id: "",
      schedule: [],
    };
    const req = mockRequest(null, null, emptyBody);

    await updateEventSchedule(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidUpdateEventRequest,
    });
  });

  it("handles invalid id update requests", async () => {
    const invalidId = {
      _id: "5d4e00bcf2d83c45a863e2bc",
      schedule: [
        {
          _id: "01234565789",
          title: "05:15 pm",
          employeeIds: [],
        },
      ],
    };

    const req = mockRequest(null, null, invalidId);

    await updateEventSchedule(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateEvent,
    });
  });

  it("handles valid update event requests", async () => {
    const admin = await User.findOne({ role: "admin" });
    let event = await Event.findOne(
      { notes: "Bring a dog!" },
      { schedule: 1, callTimes: 1 },
    ).lean();

    const _id = event.callTimes[0];
    const employeeIds = [admin._id];

    const updatedEventDetails = {
      _id: event._id,
      schedule: [
        {
          _id,
          employeeIds,
        },
      ],
    };

    expect(event.schedule).toEqual([
      {
        _id,
        employeeIds: [],
      },
    ]);

    const req = mockRequest(null, null, updatedEventDetails);

    await updateEventSchedule(req, res);

    event = await Event.findOne(
      { notes: "Bring a dog!" },
      { schedule: 1 },
    ).lean();

    expect(event.schedule).toEqual([
      {
        _id,
        employeeIds,
      },
    ]);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the event's schedule.",
    });
  });
});
