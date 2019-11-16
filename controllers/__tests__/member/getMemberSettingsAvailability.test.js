import { User } from "models";
import { getMemberSettingsAvailability } from "controllers/member";
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

    await getMemberSettingsAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMemberId,
    });
  });

  // it("handles valid no event counts requests", async () => {
  //   const selectedDate = "";
  //
  //   const session = {
  //     user: {
  //       id: existingMember._id,
  //     },
  //   };
  //
  //   const req = mockRequest(null, session, null, { selectedDate });
  //
  //   await getMemberSettingsAvailability(req, res);
  //
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.send).toHaveBeenCalledWith({});
  // });

  it("handles valid get member settings availability requests", async () => {
    const selectedDate = "2019-02-10T02:30:31.834Z";
    const session = {
      user: {
        id: existingMember._id,
      },
    };

    const req = mockRequest(null, session, null, { selectedDate });

    await getMemberSettingsAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      eventAvailability: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          label: expect.any(String),
          value: expect.any(Number),
        }),
      ]),
      memberResponseCount: expect.arrayContaining([
        expect.objectContaining({
          color: expect.any(String),
          id: expect.any(String),
          label: expect.any(String),
          value: expect.any(Number),
        }),
      ]),
      memberScheduleEvents: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          events: expect.any(Number),
        }),
      ]),
    });
  });
});
