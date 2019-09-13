import { Event, User } from "models";
import { getEventForScheduling } from "controllers/event";
import { missingEventId, unableToLocateEvent } from "shared/authErrors";
import { createColumnSchedule, createUserSchedule } from "shared/helpers";

describe("Get Event For Scheduling Controller", () => {
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

    await getEventForScheduling(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingEventId,
    });
  });

  it("handles invalid get event requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const req = mockRequest(null, null, null, null, { id });

    await getEventForScheduling(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateEvent,
    });
  });

  it("handles valid get event requests", async () => {
    const notes = "Star Wars night!";
    const event = await Event.findOne({ notes }, { __v: 0 }).lean();
    const members = await User.find(
      { role: { $nin: ["admin", "staff"] }, status: "active" },
      { _id: 1, firstName: 1, lastName: 1 },
    ).lean();

    const req = mockRequest(null, null, null, null, { id: event._id });

    await getEventForScheduling(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      schedule: {
        columns: createColumnSchedule({ event, members }),
        event,
        users: createUserSchedule({ event, members }),
      },
    });
  });
});
