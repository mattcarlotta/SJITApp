import { Mail } from "models";
import { getMail } from "controllers/mail";
import { missingMailId, unableToLocateMail } from "shared/authErrors";

describe("Get Mail Controller", () => {
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

    await getMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMailId,
    });
  });

  it("handles invalid get email requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const req = mockRequest(null, null, null, null, { id });

    await getMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateMail,
    });
  });

  it("handles valid get email requests", async () => {
    const existingMail = await Mail.findOne({ subject: "Test" });

    const req = mockRequest(null, null, null, null, { id: existingMail._id });

    await getMail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      email: expect.objectContaining({
        _id: expect.any(ObjectId),
        sendTo: expect.any(Array),
        sendDate: expect.any(Date),
        status: expect.any(String),
        sendFrom: expect.any(String),
        subject: expect.any(String),
        message: expect.any(String),
      }),
    });
  });
});
