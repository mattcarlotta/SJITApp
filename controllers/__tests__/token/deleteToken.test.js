import { Types } from "mongoose";
import { Token, Season } from "models";
import { deleteToken } from "controllers/token";
import { invalidDeleteTokenRequest } from "shared/authErrors";
import { createSignupToken } from "shared/helpers";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

describe("Delete Token Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty params requests", async () => {
    const emptyParams = {
      id: "",
    };

    const res = mockResponse();
    const req = mockRequest(null, null, null, null, emptyParams);

    await deleteToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidDeleteTokenRequest,
    });
  });

  it("handles invalid param token ids", async () => {
    const invalidId = {
      id: Types.ObjectId(),
    };

    const res = mockResponse();
    const req = mockRequest(null, null, null, null, invalidId);

    await deleteToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidDeleteTokenRequest,
    });
  });

  it("handles valid delete token requests", async () => {
    const newSeason = {
      seasonId: "20212022",
      startDate: new Date(2021, 9, 6),
      endDate: new Date(2022, 7, 6),
    };

    await Season.create(newSeason);

    const newHire = {
      authorizedEmail: "deletehire@example.com",
      role: "member",
      seasonId: newSeason.seasonId,
      token: createSignupToken(),
    };

    await Token.create(newHire);
    const newToken = await Token.findOne({
      authorizedEmail: newHire.authorizedEmail,
    });

    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id: newToken._id });

    await deleteToken(req, res);

    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the authorization key.",
    });
  });
});
