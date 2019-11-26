import { User } from "models";
import { getMemberSettings } from "controllers/member";
import { missingMemberId } from "shared/authErrors";

describe("Get Member Settings Controller", () => {
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

  it("handles invalid session requests", async () => {
    const session = {
      user: {
        id: "",
      },
    };
    const req = mockRequest(null, session);

    await getMemberSettings(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMemberId,
    });
  });

  it("handles valid get member settings requests", async () => {
    const existingMember = await User.findOne({
      email: "scheduledmember@test.com",
    });

    const session = {
      user: {
        id: existingMember._id,
      },
    };

    const req = mockRequest(null, session);

    await getMemberSettings(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      member: expect.objectContaining({
        _id: expect.any(ObjectId),
        email: expect.any(String),
        emailReminders: expect.any(Boolean),
        firstName: expect.any(String),
        lastName: expect.any(String),
        registered: expect.any(Date),
        role: expect.any(String),
        status: expect.any(String),
      }),
    });
  });
});
