import { User } from "models";
import { getMember } from "controllers/member";
import { missingMemberId, unableToLocateMember } from "shared/authErrors";

describe("Get Member Controller", () => {
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

    await getMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMemberId,
    });
  });

  it("handles invalid get member requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const req = mockRequest(null, null, null, null, { id });

    await getMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateMember,
    });
  });

  it("handles valid get Member requests", async () => {
    const email = "carlotta.matt@gmail.com";
    const existingMember = await User.findOne({ email });

    const req = mockRequest(null, null, null, null, { id: existingMember._id });

    await getMember(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      member: expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(ObjectId),
        email: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        registered: expect.any(Date),
        role: expect.any(String),
        schedule: expect.any(Array),
        status: expect.any(String),
      }),
    });
  });
});
