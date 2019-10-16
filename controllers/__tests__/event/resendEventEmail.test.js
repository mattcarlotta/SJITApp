import { Event } from "models";
import { resendEventEmail } from "controllers/event";
import { missingEventId, unableToLocateEvent } from "shared/authErrors";

describe("Resend Event Email Reminders Controller", () => {
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
    const emptyParams = {
      id: "",
    };
    const req = mockRequest(null, null, null, null, emptyParams);

    await resendEventEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingEventId,
    });
  });

  it("handles invalid id update requests", async () => {
    const invalidId = {
      id: "5d4e00bcf2d83c45a863e2bc",
    };

    const req = mockRequest(null, null, null, null, invalidId);

    await resendEventEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateEvent,
    });
  });

  it("handles valid resend event reminders requests", async () => {
    let exisitingEvent = await Event.findOne({
      opponent: "Charlotte Checkers",
    });

    const updatedEventEmailReminders = {
      id: exisitingEvent._id,
    };

    const req = mockRequest(null, null, null, null, updatedEventEmailReminders);

    await resendEventEmail(req, res);

    exisitingEvent = await Event.findOne({ opponent: "Charlotte Checkers" });

    expect(exisitingEvent).toEqual(
      expect.objectContaining({
        sentEmailReminders: false,
      }),
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "Email notifications for that event will be resent within 24 hours of the event date.",
    });
  });
});
