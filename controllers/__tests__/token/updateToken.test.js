import { Mail, Token } from "models";
import { updateToken } from "controllers/token";
import { createSignupToken, expirationDate } from "shared/helpers";
import {
  emailAlreadyTaken,
  missingUpdateTokenParams,
  unableToUpdateToken,
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

  it("handles attempts to update a token with an email that already exists", async () => {
    const existingToken = await Token.findOne({
      authorizedEmail: "member55@example.com",
    });

    const usedTokenId = {
      _id: existingToken._id,
      authorizedEmail: "carlotta.matt@gmail.com",
      role: "staff",
      seasonId: "20412042",
    };

    const req = mockRequest(null, null, usedTokenId);

    await updateToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: emailAlreadyTaken,
    });
  });

  it("handles attempts to edit used tokens", async () => {
    const newHire = {
      authorizedEmail: "usedmember@example.com",
      email: "usedmember@example.com",
      role: "employee",
      seasonId: "20402041",
      token: createSignupToken(),
      expiration: expirationDate().toDate(),
    };

    const usedToken = await Token.create(newHire);

    const usedTokenId = {
      _id: usedToken._id,
      authorizedEmail: "newusedmember@example.com",
      role: "staff",
      seasonId: "20412042",
    };

    const req = mockRequest(null, null, usedTokenId);

    await updateToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToUpdateToken,
    });
  });

  it("handles update token requets", async () => {
    const mailSpy = jest.spyOn(Mail, "create");

    const token = createSignupToken();
    const newHire = {
      authorizedEmail: "mywaterbottle@example.com",
      email: "",
      role: "employee",
      token,
      expiration: expirationDate().toDate(),
    };

    let createdToken = await Token.create(newHire);

    const authorizedEmail = "herwaterbottle@test.com";
    const updatedToken = {
      _id: createdToken._id,
      authorizedEmail,
      role: "staff",
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
      }),
    );

    expect(mailSpy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `Succesfully updated and sent a new authorization key to ${authorizedEmail}.`,
    });
  });
});
