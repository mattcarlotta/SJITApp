import { Form } from "models";
import { deleteManyForms } from "controllers/form";
import { missingIds } from "shared/authErrors";

describe("Delete Many Forms Controller", () => {
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
    const ids = [];
    const req = mockRequest(null, null, { ids });

    await deleteManyForms(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingIds,
    });
  });

  it("handles valid delete many forms requests", async () => {
    const existingForm = await Form.findOne({ notes: "Delete this form." });

    const req = mockRequest(null, null, {
      ids: [existingForm._id],
    });

    await deleteManyForms(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the forms.",
    });
  });
});
