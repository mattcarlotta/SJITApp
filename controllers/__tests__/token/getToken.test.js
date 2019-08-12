import { Token } from "models";
import { getToken } from "controllers/token";
import { createSignupToken, expirationDate } from "shared/helpers";
import { missingTokenId, unableToLocateToken } from "shared/authErrors";

describe("Get Token Controller", () => {
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
    const emptyParams = {
      id: "",
    };

    const req = mockRequest(null, null, null, null, emptyParams);

    await getToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingTokenId,
    });
  });

  it("handles invalid ids", async () => {
    const invalidId = {
      id: "5d44a68188524202892bd82e",
    };

    const req = mockRequest(null, null, null, null, invalidId);

    await getToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateToken,
    });
  });

  it("handles valid requests to retrieve a token for editing", async () => {
    const newHire = {
      authorizedEmail: "pop@example.com",
      email: "",
      role: "employee",
      seasonId: "20402041",
      token: createSignupToken(),
      expiration: expirationDate().toDate(),
    };

    const unusedToken = await Token.create(newHire);

    const getTokenId = {
      id: unusedToken._id,
    };

    const req = mockRequest(null, null, null, null, getTokenId);

    await getToken(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: expect.objectContaining({
        _id: expect.any(ObjectId),
        authorizedEmail: expect.any(String),
        email: expect.any(String),
        expiration: expect.any(Date),
        role: expect.any(String),
        seasonId: expect.any(String),
      }),
    });
  });
});
