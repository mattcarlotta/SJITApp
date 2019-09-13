import { Form } from "models";
import { getForm } from "controllers/form";
import { missingFormId, unableToLocateForm } from "shared/authErrors";

describe("Get Form Controller", () => {
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

    await getForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingFormId,
    });
  });

  it("handles invalid get form requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const req = mockRequest(null, null, null, null, { id });

    await getForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateForm,
    });
  });

  it("handles valid get form requests", async () => {
    const existingForm = await Form.findOne({ notes: "Form 1" });

    const req = mockRequest(null, null, null, null, { id: existingForm._id });

    await getForm(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      form: expect.objectContaining({
        _id: expect.any(ObjectId),
        expirationDate: expect.any(Date),
        startMonth: expect.any(Date),
        endMonth: expect.any(Date),
        notes: expect.any(String),
        seasonId: expect.any(String),
      }),
    });
  });
});
