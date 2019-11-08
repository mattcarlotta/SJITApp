import { getAllTokens } from "controllers/token";

describe("Get All Tokens Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles valid get all tokens requests", async () => {
    const req = mockRequest(null, null, null, { page: "1" });
    const res = mockResponse();

    await getAllTokens(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      tokens: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          authorizedEmail: expect.any(String),
          email: expect.any(String),
          expiration: expect.any(Date),
          role: expect.any(String),
          token: expect.any(String),
        }),
      ]),
      totalDocs: expect.any(Number),
    });
  });
});
