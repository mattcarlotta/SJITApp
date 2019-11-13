import { getEvents } from "controllers/dashboard";
import { missingMemberId } from "shared/authErrors";
import { User } from "models";

describe("Get Dashboard Events Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  let existingMember;
  beforeAll(async () => {
    db = connectDatabase();
    existingMember = await User.findOne({ email: "scheduledmember@test.com" });
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty params requests", async () => {
    const session = {
      user: { id: "" },
    };
    const selectedEvent = "today";
    const req = mockRequest(null, session, null, null, { selectedEvent });

    await getEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMemberId,
    });
  });

  it("handles valid get today's events requests", async () => {
    const session = {
      user: { id: existingMember._id },
    };
    const selectedEvent = "today";

    const req = mockRequest(null, session, null, null, { selectedEvent });

    await getEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      events: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          eventDate: expect.any(Date),
          eventType: expect.any(String),
          location: expect.any(String),
          notes: expect.any(String),
          opponent: expect.any(String),
          schedule: expect.any(Array),
          team: expect.any(String),
          uniform: expect.any(String),
        }),
      ]),
    });
  });

  it("handles valid get upcoming events requests", async () => {
    const session = {
      user: { id: existingMember._id },
    };
    const selectedEvent = "upcoming";

    const req = mockRequest(null, session, null, null, { selectedEvent });

    await getEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      events: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          eventDate: expect.any(Date),
          eventType: expect.any(String),
          location: expect.any(String),
          opponent: expect.any(String),
          schedule: expect.any(Array),
          team: expect.any(String),
          uniform: expect.any(String),
        }),
      ]),
    });
  });
});
