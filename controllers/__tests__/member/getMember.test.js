import { User } from "models";
import { getMember } from "controllers/member";

describe("Get Member Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty params requests", async () => {
    const id = "";
    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id });

    await getMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: "You must include a memberId.",
    });
  });

  it("handles invalid get member requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id });

    await getMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: `Unable to locate the member: ${id}.`,
    });
  });

  it("handles valid get Member requests", async () => {
    const email = "carlotta.matt@gmail.com";
    const existingMember = await User.findOne({ email });

    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id: existingMember._id });

    await getMember(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      member: expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(ObjectId),
        email: expect.any(String),
        events: expect.any(Array),
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
