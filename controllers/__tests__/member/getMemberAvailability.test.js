import { User } from "models";
import { getMemberAvailability } from "controllers/member";
import { unableToLocateMember } from "shared/authErrors";

describe("Get Member Availability Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  let existingUser;
  beforeAll(async () => {
    db = connectDatabase();
    existingUser = await User.findOne({ role: "admin" });
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty query requests", async () => {
    const id = "";
    const selectedDate = "";
    const req = mockRequest(null, null, null, { id, selectedDate });

    await getMemberAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: "TypeError: Cannot read property 'user' of null",
    });
  });

  it("handles invalid loggedin users requests", async () => {
    const user = {
      id: "5d5b5ee857a6d20abf49db19",
    };
    const req = mockRequest(null, { user }, null, { selectedDate: "" });

    await getMemberAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateMember,
    });
  });

  it("handles invalid member id requests", async () => {
    const id = "5d5b5ee857a6d20abf49db19";
    const selectedDate = "2019-08-21T02:30:36.000+00:00";
    const req = mockRequest(null, null, null, { id, selectedDate });

    await getMemberAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateMember,
    });
  });

  it("handles no events during selected date", async () => {
    const selectedDate = "1999-08-21T02:30:36.000+00:00";

    const req = mockRequest(null, null, null, {
      id: existingUser._id,
      selectedDate,
    });

    await getMemberAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(null);
  });

  it("handles valid get member events counts requests", async () => {
    const selectedDate = "2019-08-01T00:00:00-07:00";

    const req = mockRequest(null, null, null, {
      id: existingUser._id,
      selectedDate,
    });

    await getMemberAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
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
