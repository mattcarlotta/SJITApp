import { Mail } from "models";
import { deleteMail } from "controllers/mail";
import { missingMailId, unableToDeleteMail } from "shared/authErrors";

describe("Delete Mail Controller", () => {
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

  it("handles empty param requests", async () => {
    const id = "";
    const req = mockRequest(null, null, null, null, { id });

    await deleteMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMailId,
    });
  });

  it("handles invalid delete email requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const req = mockRequest(null, null, null, null, { id });

    await deleteMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToDeleteMail,
    });
  });

  it("handles valid delete email requests", async () => {
    const existingMail = await Mail.findOne({ subject: "Test 2" });

    const req = mockRequest(null, null, null, null, {
      id: existingMail._id,
    });

    await deleteMail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the email.",
    });
  });
});
