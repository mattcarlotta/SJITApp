import { Mail, Token, Season } from "models";
import { resendToken } from "controllers/token";
import {
  missingTokenId,
  unableToLocateToken,
  unableToUpdateToken,
} from "shared/authErrors";

describe("Resend Token Controller", () => {
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

  it("handles empty params requests", async () => {
    const req = mockRequest(null, null, null, null, { id: "" });

    await resendToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingTokenId,
    });
  });

  it("handles requests with invalid token requests", async () => {
    const req = mockRequest(null, null, null, null, {
      id: "5dc9ea24d60d2d3c7bce3e08",
    });

    await resendToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateToken,
    });
  });

  it("handles requests with tokens that are already associated with an active account", async () => {
    const newHire = {
      authorizedEmail: "resendtokenmember@example.com",
      email: "resendtokenmember@example.com",
      role: "employee",
      seasonId: "20402041",
      token: "1458182518718",
      expiration: new Date(2080, 10, 6),
    };

    const usedToken = await Token.create(newHire);

    const req = mockRequest(null, null, null, null, { id: usedToken._id });

    await resendToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToUpdateToken,
    });
  });

  it("handles valid create token (new hire) requests", async () => {
    const mailSpy = jest.spyOn(Mail, "create");

    const newSeason = {
      seasonId: "20802081",
      startDate: new Date(2080, 9, 6),
      endDate: new Date(2081, 7, 6),
    };
    await Season.create(newSeason);

    const newHire = {
      authorizedEmail: "newhirefortokens@example.com",
      role: "employee",
      seasonId: newSeason.seasonId,
      expirationDate: new Date(2080, 10, 6),
      token: "hello",
    };

    const newToken = await Token.create(newHire);

    const req = mockRequest(null, null, null, null, { id: newToken._id });

    await resendToken(req, res);

    const resentToken = await Token.findOne({
      authorizedEmail: newHire.authorizedEmail,
    });

    expect(newToken.token).not.toEqual(resentToken.token);

    expect(mailSpy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `An authorization key will be resent to ${newHire.authorizedEmail} shortly.`,
    });
  });
});
