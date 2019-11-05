import { contactUs } from "controllers/mail";
import { invalidContactUsRequest } from "shared/authErrors";

describe("Contact Us Controller", () => {
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

    await contactUs(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidContactUsRequest,
    });
  });

  it("handles valid contact us requests", async () => {
    const session = {
      user: {
        firstName: "Bob",
        lastName: "Dole",
        email: "bob@example.com",
      },
    };
    const newMail = {
      sendTo: "Staff",
      sendFrom: "test@test.com",
      sendDate: "",
      message: "<span>Test 8182</span>",
      subject: "Test 628518",
    };

    const req = mockRequest(null, session, newMail);

    await contactUs(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "Thank you for contacting us. The staff has received your message. Expect a response within 24 hours.",
    });
  });
});
