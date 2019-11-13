import { Token } from "models";
import { getAllTokens } from "controllers/token";
import { createSignupToken } from "shared/helpers";

const newHire1 = {
  authorizedEmail: "test88@example.com",
  role: "employee",
  token: createSignupToken(),
};

const newHire2 = {
  authorizedEmail: "test1884@example.com",
  role: "employee",
  token: createSignupToken(),
};

describe("Get All Tokens Controller", () => {
  let db;
  beforeAll(async () => {
    db = connectDatabase();
    await Token.insertMany([newHire1, newHire2]);
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles valid get all registered token requests", async () => {
    const email = "registered";
    const res = mockResponse();
    const req = mockRequest(null, null, null, { email });

    await getAllTokens(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      tokens: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          authorizedEmail: expect.any(String),
          email: expect.any(String),
          role: expect.any(String),
          token: expect.any(String),
        }),
      ]),
      totalDocs: expect.any(Number),
    });
  });

  it("handles valid get all role requests", async () => {
    const role = "employee";
    const res = mockResponse();
    const req = mockRequest(null, null, null, { role });

    await getAllTokens(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      tokens: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          authorizedEmail: expect.any(String),
          role,
          token: expect.any(String),
        }),
      ]),
      totalDocs: expect.any(Number),
    });
  });

  it("handles valid get all tokens requests", async () => {
    const res = mockResponse();
    const req = mockRequest(null, null, null, {});

    await getAllTokens(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      tokens: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          authorizedEmail: expect.any(String),
          role: expect.any(String),
          token: expect.any(String),
        }),
      ]),
      totalDocs: expect.any(Number),
    });
  });
});
