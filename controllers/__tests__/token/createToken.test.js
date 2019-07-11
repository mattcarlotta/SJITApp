import mailer from "@sendgrid/mail";
import { Token, Season } from "models";
import { createToken } from "controllers/token";
import { invalidAuthTokenRequest, invalidSeasonId } from "shared/authErrors";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Create Token Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty body requests", async () => {
    const emptyBody = {
      authorizedEmail: "",
      role: "",
      seasonId: "",
    };

    const res = mockResponse();
    const req = mockRequest(null, null, emptyBody);

    await createToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidAuthTokenRequest,
    });
  });

  it("handles requests with invalid seasonIds", async () => {
    const invalidSeason = {
      authorizedEmail: "test@example.com",
      role: "member",
      seasonId: "00000000",
    };

    const res = mockResponse();
    const req = mockRequest(null, null, invalidSeason);

    await createToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidSeasonId,
    });
  });

  it("handles valid create token (new hire) requests", async () => {
    const newSeason = {
      seasonId: "20202021",
      startDate: new Date(2020, 9, 6),
      endDate: new Date(2021, 7, 6),
    };
    await Season.create(newSeason);

    const newHire = {
      authorizedEmail: "newhire@example.com",
      role: "member",
      seasonId: newSeason.seasonId,
    };

    const res = mockResponse();
    const req = mockRequest(null, null, newHire);

    await createToken(req, res);

    const newToken = await Token.findOne({
      authorizedEmail: newHire.authorizedEmail,
    });

    expect(newToken).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(ObjectId),
        authorizedEmail: expect.any(String),
        role: expect.any(String),
        seasonId: expect.any(String),
        token: expect.any(String),
      }),
    );

    expect(mailer.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `Succesfully created and sent an authorization key to ${newHire.authorizedEmail}.`,
    });
  });
});
