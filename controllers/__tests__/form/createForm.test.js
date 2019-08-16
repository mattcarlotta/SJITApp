import { Form } from "models";
import { createForm } from "controllers/form";
import { unableToCreateNewForm, unableToLocateSeason } from "shared/authErrors";

describe("Create Form Controller", () => {
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
    const emptyBody = {
      expirationDate: "",
      enrollMonth: "",
      notes: "",
      seasonId: "",
    };

    const req = mockRequest(null, null, emptyBody);

    await createForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToCreateNewForm,
    });
  });

  it("handles invalid seasonIds", async () => {
    const newForm = {
      expirationDate: "2019-08-10T02:30:31.834+00:00",
      enrollMonth: [
        "2000-08-01T07:00:00.000+00:00",
        "2000-08-31T07:00:00.000+00:00",
      ],
      notes: "",
      seasonId: "99999999",
    };

    const req = mockRequest(null, null, newForm);

    await createForm(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateSeason,
    });
  });

  it("handles valid create form requests", async () => {
    const newForm = {
      expirationDate: new Date("2000-08-10T07:00:00.000Z"),
      enrollMonth: [
        new Date("2000-08-01T07:00:00.000Z"),
        new Date("2000-08-31T07:00:00.000Z"),
      ],
      notes: "Let me know if you want to work extra games.",
      seasonId: "20002001",
    };

    const req = mockRequest(null, null, newForm);

    await createForm(req, res);

    const createdForm = await Form.findOne({ notes: newForm.notes });

    expect(createdForm).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(ObjectId),
        expirationDate: newForm.expirationDate,
        startMonth: newForm.enrollMonth[0],
        endMonth: newForm.enrollMonth[1],
        notes: newForm.notes,
        seasonId: newForm.seasonId,
      }),
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully created a new form!",
    });
  });
});
