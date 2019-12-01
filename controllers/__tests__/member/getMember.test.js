import { User } from "models";
import { getMember } from "controllers/member";
import { createDate, createSignupToken } from "shared/helpers";
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
    const email = "hello.goodbye@test.com";
    const existingMember = await User.create({
      email,
      role: "employee",
      token: createSignupToken(),
      firstName: "Hello",
      lastName: "Goodbye",
      password: "password",
      registered: createDate().toDate(),
    });

    const req = mockRequest(null, null, null, null, { id: existingMember._id });

    await getMember(req, res);

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
