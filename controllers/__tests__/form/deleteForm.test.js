import { Form } from "models";
import { deleteForm } from "controllers/form";
import { missingFormId, unableToDeleteForm } from "shared/authErrors";

describe("Delete Form Controller", () => {
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

    await deleteForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingFormId,
    });
  });

  it("handles invalid delete form requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const req = mockRequest(null, null, null, null, { id });

    await deleteForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToDeleteForm,
    });
  });

  it("handles valid delete form requests", async () => {
    const existingForm = await Form.findOne({ notes: "Form 2" });

    const req = mockRequest(null, null, null, null, {
      id: existingForm._id,
    });

    await deleteForm(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the form.",
    });
  });
});
