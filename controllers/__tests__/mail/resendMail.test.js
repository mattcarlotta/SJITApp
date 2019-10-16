import { Mail } from "models";
import { resendMail } from "controllers/mail";
import { missingMailId, unableToLocateMail } from "shared/authErrors";

describe("Resend Email Controller", () => {
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

  it("handles empty body requests", async () => {
    const emptyParams = {
      id: "",
    };
    const req = mockRequest(null, null, null, null, emptyParams);

    await resendMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMailId,
    });
  });

  it("handles invalid id update requests", async () => {
    const invalidId = {
      id: "5d4e00bcf2d83c45a863e2bc",
    };

    const req = mockRequest(null, null, null, null, invalidId);

    await resendMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateMail,
    });
  });

  it("handles valid resend form email notifications requests", async () => {
    const subject = "Test 2";
    let exisitingMail = await Mail.findOne({
      subject,
    });

    expect(exisitingMail).toEqual(
      expect.objectContaining({
        status: "sent",
      }),
    );

    const updatedEmail = {
      id: exisitingMail._id,
    };

    const req = mockRequest(null, null, null, null, updatedEmail);

    await resendMail(req, res);

    exisitingMail = await Mail.findOne({ subject });

    expect(exisitingMail).toEqual(
      expect.objectContaining({
        status: "unsent",
      }),
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "That email will be resent shortly.",
    });
  });
});
