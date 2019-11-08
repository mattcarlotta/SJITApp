import { getAvailability } from "controllers/dashboard";
import { missingMemberId } from "shared/authErrors";
import { User } from "models";

describe("Dashboard Get Member Availability", () => {
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

    await getAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMemberId,
    });
  });

  it("handles valid get member availability requests", async () => {
    const existingMember = await User.findOne({
      email: "scheduledmember@test.com",
    });
    const session = {
      user: {
        id: existingMember._id,
      },
    };
    const req = mockRequest(null, session);

    await getAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      eventAvailability: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          label: expect.any(String),
          value: expect.any(Number),
        }),
      ]),
      months: expect.arrayContaining([expect.any(Date)]),
    });
  });
});
