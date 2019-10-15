import { Event } from "models";
import { getEventForScheduling } from "controllers/event";
import { missingEventId, unableToLocateEvent } from "shared/authErrors";

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

    const req = mockRequest(null, null, null, null, { id: event._id });

    await getEventForScheduling(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      schedule: {
        columns: expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            employeeIds: expect.anything(),
          }),
        ]),
        event,
        users: expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(ObjectId),
            firstName: expect.any(String),
            lastName: expect.any(String),
            notes: expect.anything(),
            response: expect.any(String),
          }),
        ]),
      },
    });
  });
});
