import { getAllMembers } from "controllers/member";

describe("Get All Members Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles valid get all members requests", async () => {
    const res = mockResponse();
    const req = mockRequest(null, null, null, { page: "1" });

    await getAllMembers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      members: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          email: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          registered: expect.any(Date),
          role: expect.any(String),
          status: expect.any(String),
        }),
      ]),
      totalDocs: expect.any(Number),
    });
  });
});
