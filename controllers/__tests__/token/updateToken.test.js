import mailer from "@sendgrid/mail";
import { Token } from "models";
import { updateToken } from "controllers/token";
import { createSignupToken, expirationDate } from "shared/helpers";
import {
  missingUpdateTokenParams,
  unableToLocateToken,
} from "shared/authErrors";

describe("Update Token Controller", () => {
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
      authorizedEmail: "",
      role: "",
      seasonId: "",
    };

    const req = mockRequest(null, null, emptyBody);

    await updateToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingUpdateTokenParams,
    });
  });

  it("handles invalid ids", async () => {
    const invalidId = {
      _id: "5d44a68188524202892bd82e",
      authorizedEmail: "test@test.com",
      role: "employee",
      seasonId: "20012002",
    };

    const req = mockRequest(null, null, invalidId);

    await updateToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateToken,
    });
  });

  it("handles update token requets", async () => {
    const token = createSignupToken();
    const newHire = {
      authorizedEmail: "mywaterbottle@example.com",
      email: "",
      role: "employee",
      seasonId: "20402041",
      token,
      expiration: expirationDate().toDate(),
    };

    let createdToken = await Token.create(newHire);

    const authorizedEmail = "herwaterbottle@test.com";
    const updatedToken = {
      _id: createdToken._id,
      authorizedEmail,
      role: "staff",
      seasonId: "20012002",
    };

    const req = mockRequest(null, null, updatedToken);

    await updateToken(req, res);

    createdToken = await Token.findOne({ _id: updatedToken._id });

    expect(createdToken).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(ObjectId),
        authorizedEmail: updatedToken.authorizedEmail,
        email: expect.any(String),
        expiration: expect.any(Date),
        role: updatedToken.role,
        seasonId: updatedToken.seasonId,
      }),
    );

    expect(mailer.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `Succesfully updated and sent a new authorization key to ${authorizedEmail}.`,
    });
  });
});