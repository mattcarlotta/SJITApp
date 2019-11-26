import { Mail } from "models";
import { deleteManyMails } from "controllers/mail";
import { missingIds } from "shared/authErrors";

describe("Delete Many Mails Controller", () => {
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
    const req = mockRequest(null, null, { ids: [] });

    await deleteManyMails(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingIds,
    });
  });

  it("handles valid delete many email requests", async () => {
    const existingMail = await Mail.findOne({
      message: "<span>Delete this mail.</span>",
    });

    const req = mockRequest(null, null, { ids: [existingMail._id] });

    await deleteManyMails(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the mail.",
    });
  });
});
