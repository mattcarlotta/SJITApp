import { createMail } from "controllers/mail";
import { invalidSendDate, unableToCreateNewMail } from "shared/authErrors";
import { createDate } from "shared/helpers";

describe("Create Mail Controller", () => {
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
      message: "",
      sendDate: "",
      sendFrom: "",
      sendTo: "",
      subject: "",
    };

    const req = mockRequest(null, null, emptyBody);

    await createMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToCreateNewMail,
    });
  });

  it("handles invalid send email dates", async () => {
    const newMail = {
      sendTo: ["test@test.com"],
      sendFrom: "test@test.com",
      sendDate: "2000-10-06T07:00:00.000+00:00",
      message: "<span>Test 4</span>",
      subject: "Test 4",
    };

    const req = mockRequest(null, null, newMail);

    await createMail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidSendDate,
    });
  });

  it("handles valid create form with sendDate requests", async () => {
    const sendDate = createDate();
    const newMail = {
      sendTo: ["test@test.com"],
      sendFrom: "test@test.com",
      sendDate: sendDate.format(),
      message: "<span>Test 4</span>",
      subject: "Test 4",
    };

    const req = mockRequest(null, null, newMail);

    await createMail(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `An email has been created and will be sent ${sendDate.format(
        "MMMM Do YYYY @ hh:mm a",
      )}!`,
    });
  });

  it("handles valid create form requests", async () => {
    const newMail = {
      sendTo: ["test@test.com"],
      sendFrom: "test@test.com",
      sendDate: "",
      message: "<span>Test 5</span>",
      subject: "Test 5",
    };

    const req = mockRequest(null, null, newMail);

    await createMail(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "An email has been created and will be sent shortly!",
    });
  });
});
