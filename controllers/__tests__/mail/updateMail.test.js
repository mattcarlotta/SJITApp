import moment from "moment-timezone";
import { Mail } from "models";
import { updateMail } from "controllers/mail";
import {
  invalidSendDate,
  unableToLocateMail,
  unableToUpdateMail,
} from "shared/authErrors";

const currentDate = moment().format();

describe("Update Mail Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  let existingMail;
  let existingMail2;
  beforeAll(async () => {
    db = connectDatabase();
    existingMail = await Mail.findOne({ subject: "Test 3" }).lean();
    existingMail2 = await Mail.findOne({ subject: "Test 88" }).lean();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty body requests", async () => {
    const emptyBody = {
      _id: "",
      message: "",
      sendDate: "",
      sendFrom: "",
      sendTo: "",
      subject: "",
    };
    const req = mockRequest(null, null, emptyBody);

    await updateMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToUpdateMail,
    });
  });

  it("handles email doesn't exist requests", async () => {
    const invalidEmailId = {
      _id: "5d4e00bcf2d83c45a863e2bc",
      message: "<span>Test 99</span>",
      sendDate: currentDate,
      sendFrom: "test@test.com",
      sendTo: ["test@test.com"],
      subject: "Test 99",
    };
    const req = mockRequest(null, null, invalidEmailId);

    await updateMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateMail,
    });
  });

  it("handles invalid send email dates", async () => {
    const oldSendDate = {
      ...existingMail,
      sendDate: "2000-04-10T02:30:31.834+00:00",
    };

    const req = mockRequest(null, null, oldSendDate);

    await updateMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidSendDate,
    });
  });

  it("handles valid update email with sendDate requests", async () => {
    const sendDate = moment().add(2, "days");
    const updatedMailDetails = {
      ...existingMail,
      sendDate: sendDate.format(),
      subject: "Test 2020",
    };

    const req = mockRequest(null, null, updatedMailDetails);

    await updateMail(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `Successfully updated the email and it will be sent ${sendDate.format(
        "MMMM Do YYYY @ hh:mm a",
      )}!`,
    });
  });

  it("handles valid update email requests", async () => {
    const updatedMailDetails = {
      ...existingMail2,
      sendDate: "",
      subject: "Test 2021",
    };

    const req = mockRequest(null, null, updatedMailDetails);

    await updateMail(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the email and it will be sent shortly!",
    });
  });
});
