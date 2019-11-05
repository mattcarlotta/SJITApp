import { User } from "models";
import { getMemberSettingsEvents } from "controllers/member";
import { missingMemberId } from "shared/authErrors";

describe("Get Member Settings Availability Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  let existingMember;
  beforeAll(async () => {
    db = connectDatabase();
    existingMember = await User.findOne({
      email: "scheduledmember@test.com",
    });
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles invalid session requests", async () => {
    const selectedDate = "";
    const session = {
      user: {
        id: "",
      },
    };
    const req = mockRequest(null, session, null, { selectedDate });

    await getMemberSettingsEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMemberId,
    });
  });

  it("handles valid get Member requests", async () => {
    const selectedDate = "2019-02-10T02:30:31.834Z";
    const session = {
      user: {
        id: existingMember._id,
      },
    };

    const req = mockRequest(null, session, null, { selectedDate });

    await getMemberSettingsEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      eventResponses: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          employeeNotes: expect.any(String),
          employeeResponse: expect.any(String),
          eventDate: expect.any(Date),
          eventType: expect.any(String),
          location: expect.any(String),
          opponent: expect.any(String),
          team: expect.any(String),
        }),
      ]),
    });
  });
});
