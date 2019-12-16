import moment from "moment-timezone";
import { Form } from "models";
import { updateForm } from "controllers/form";
import {
  formAlreadyExists,
  // invalidExpirationDate,
  // invalidSendDate,
  unableToLocateForm,
  unableToLocateSeason,
  unableToUpdateForm,
} from "shared/authErrors";

const currentDate = moment().format();

describe("Update Form Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  let newForm;
  let newForm2;
  beforeAll(async () => {
    db = connectDatabase();
    const form = await Form.create({
      expirationDate: currentDate,
      startMonth: new Date("2020-04-01T07:00:00.000Z"),
      endMonth: new Date("2020-04-31T07:00:00.000Z"),
      notes: "Form 88",
      seasonId: "20192020",
      sendEmailNotificationsDate: currentDate,
    });

    const form2 = await Form.create({
      expirationDate: currentDate,
      startMonth: new Date("2020-05-01T07:00:00.000Z"),
      endMonth: new Date("2020-05-31T07:00:00.000Z"),
      notes: "Form 888888",
      seasonId: "20192020",
      sendEmailNotificationsDate: currentDate,
      sentEmails: true,
    });

    newForm = {
      _id: form._id,
      expirationDate: form.expirationDate,
      sendEmailNotificationsDate: form.sendEmailNotificationsDate,
      sendEmails: form.sendEmails,
      enrollMonth: [form.startMonth, form.endMonth],
      notes: form.notes,
      seasonId: form.seasonId,
    };

    newForm2 = {
      _id: form2._id,
      expirationDate: form2.expirationDate,
      sendEmailNotificationsDate: form2.sendEmailNotificationsDate,
      sendEmails: form2.sendEmails,
      enrollMonth: [form2.startMonth, form2.endMonth],
      notes: form2.notes,
      seasonId: form2.seasonId,
      sentEmails: form2.sentEmails,
    };
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
      sendEmailNotificationsDate: "",
    };
    const req = mockRequest(null, null, emptyBody);

    await updateForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToUpdateForm,
    });
  });

  it("handles form already exists requests", async () => {
    const existingForm = await Form.findOne({ notes: "Form 1" });

    const updatedForm = {
      _id: existingForm._id,
      expirationDate: new Date("2099-08-01T07:00:00.000Z"),
      enrollMonth: [
        new Date("2005-08-01T07:00:00.000Z"),
        new Date("2005-08-31T07:00:00.000Z"),
      ],
      notes: "Form 1",
      seasonId: "20002001",
      sendEmailNotificationsDate: new Date(),
      sentEmails: false,
    };

    const req = mockRequest(null, null, updatedForm);

    await updateForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: formAlreadyExists,
    });
  });

  it("handles season doesn't exist requests", async () => {
    const invalidSeason = {
      _id: "0123456789",
      expirationDate: "0123456789",
      enrollMonth: ["0123456789", "0123456789"],
      notes: "",
      seasonId: "0123456789",
      sendEmailNotificationsDate: currentDate,
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
      sendEmailNotificationsDate: currentDate,
    };
    const req = mockRequest(null, null, invalidFormId);

    await updateForm(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateForm,
    });
  });

  // it("handles invalid expiration dates", async () => {
  //   const oldExpDate = {
  //     ...newForm,
  //     expirationDate: "2000-04-10T02:30:31.834+00:00",
  //   };
  //
  //   const req = mockRequest(null, null, oldExpDate);
  //
  //   await updateForm(req, res);
  //
  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.json).toHaveBeenCalledWith({
  //     err: invalidExpirationDate,
  //   });
  // });

  // it("handles invalid send email notification dates", async () => {
  //   const oldSendDate = {
  //     ...newForm,
  //     sendEmailNotificationsDate: "2000-04-10T02:30:31.834+00:00",
  //   };
  //
  //   const req = mockRequest(null, null, oldSendDate);
  //
  //   await updateForm(req, res);
  //
  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.json).toHaveBeenCalledWith({
  //     err: invalidSendDate,
  //   });
  // });

  it("handles valid update form requests without resending an email", async () => {
    const updatedFormDetails = {
      ...newForm,
      enrollMonth: [
        "2021-08-01T07:00:00.000+00:00",
        "2021-08-31T07:00:00.000+00:00",
      ],
    };

    const req = mockRequest(null, null, updatedFormDetails);

    await updateForm(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the form!",
    });
  });

  it("handles valid update form requests with resending an email", async () => {
    const updatedFormDetails = {
      ...newForm2,
      enrollMonth: [
        "2022-08-01T07:00:00.000+00:00",
        "2022-08-31T07:00:00.000+00:00",
      ],
      sendEmailNotificationsDate: moment()
        .add(1, "day")
        .format(),
    };

    const req = mockRequest(null, null, updatedFormDetails);

    await updateForm(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the form!",
    });
  });
});
