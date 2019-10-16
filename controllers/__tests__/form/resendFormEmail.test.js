import { Form } from "models";
import { resendFormEmail } from "controllers/form";
import { missingFormId, unableToLocateForm } from "shared/authErrors";

describe("Resend Form Email Notifications Controller", () => {
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

    await resendFormEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingFormId,
    });
  });

  it("handles invalid id update requests", async () => {
    const invalidId = {
      id: "5d4e00bcf2d83c45a863e2bc",
    };

    const req = mockRequest(null, null, null, null, invalidId);

    await resendFormEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateForm,
    });
  });

  it("handles valid resend form email notifications requests", async () => {
    let exisitingForm = await Form.findOne({
      notes: "Form 7",
    });

    const updatedFormEmailReminders = {
      id: exisitingForm._id,
    };

    const req = mockRequest(null, null, null, null, updatedFormEmailReminders);

    await resendFormEmail(req, res);

    exisitingForm = await Form.findOne({ notes: "Form 7" });

    expect(exisitingForm).toEqual(
      expect.objectContaining({
        sentEmails: false,
      }),
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email notifications for that form will be resent shortly.",
    });
  });
});
