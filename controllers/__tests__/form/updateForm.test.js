import { Form } from "models";
import { updateForm } from "controllers/form";
import {
  unableToLocateForm,
  unableToLocateSeason,
  unableToUpdateForm,
} from "shared/authErrors";

describe("Update Form Controller", () => {
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
      _id: "",
      expirationDate: "",
      enrollMonth: "",
      notes: "",
      seasonId: "",
    };
    const req = mockRequest(null, null, emptyBody);

    await updateForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToUpdateForm,
    });
  });

  it("handles season doesn't exist requests", async () => {
    const invalidSeason = {
      _id: "0123456789",
      expirationDate: "0123456789",
      enrollMonth: ["0123456789", "0123456789"],
      notes: "",
      seasonId: "0123456789",
    };
    const req = mockRequest(null, null, invalidSeason);

    await updateForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateSeason,
    });
  });

  it("handles invalid form id update requests", async () => {
    const invalidFormId = {
      _id: "5d4e00bcf2d83c45a863e2bc",
      expirationDate: "2019-08-10T02:30:31.834+00:00",
      enrollMonth: [
        "2000-08-01T07:00:00.000+00:00",
        "2000-08-31T07:00:00.000+00:00",
      ],
      notes: "",
      seasonId: "20002001",
    };
    const req = mockRequest(null, null, invalidFormId);

    await updateForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateForm,
    });
  });

  it("handles valid update form requests", async () => {
    const form = {
      expirationDate: new Date("2011-08-10T07:00:00.000Z"),
      startMonth: new Date("2011-08-01T07:00:00.000Z"),
      endMonth: new Date("2011-08-31T07:00:00.000Z"),
      notes: "Form 88",
      seasonId: "20112012",
    };
    const existingForm = await Form.create(form);

    const updatedFormDetails = {
      _id: existingForm._id,
      expirationDate: "2019-08-10T02:30:31.834+00:00",
      enrollMonth: [
        "2000-08-01T07:00:00.000+00:00",
        "2000-08-31T07:00:00.000+00:00",
      ],
      notes: "",
      seasonId: "20002001",
    };

    const req = mockRequest(null, null, updatedFormDetails);

    await updateForm(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the form!",
    });
  });
});
