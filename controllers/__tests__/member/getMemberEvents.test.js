import { User } from "models";
import { getMemberEvents } from "controllers/member";
import { missingMemberId, unableToLocateMember } from "shared/authErrors";

describe("Get Member Events", () => {
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
    const id = "";
    const selectedDate = "";
    const req = mockRequest(null, null, null, { id, selectedDate });

    await getMemberEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMemberId,
    });
  });

  it("handles invalid member id requests", async () => {
    const id = "5d5b5ee857a6d20abf49db19";
    const selectedDate = "2019-08-21T02:30:36.000+00:00";
    const req = mockRequest(null, null, null, { id, selectedDate });

    await getMemberEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateMember,
    });
  });

  it("handles valid get member events requests", async () => {
    const existingUser = await User.findOne({
      email: "carlotta.matt@gmail.com",
    });

    const id = existingUser._id;
    const selectedDate = "2019-08-21T02:30:36.000+00:00";

    const req = mockRequest(null, null, null, { id, selectedDate });

    await getMemberEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      eventResponses: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          employeeNotes: expect.any(String),
          employeeResponse: expect.any(String),
          eventDate: expect.any(Date),
          eventNotes: expect.any(String),
          eventType: expect.any(String),
          location: expect.any(String),
          opponent: expect.any(String),
          team: expect.any(String),
        }),
      ]),
    });
  });
});
