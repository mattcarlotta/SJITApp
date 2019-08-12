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
    const req = mockRequest();

    await getAllMembers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      members: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          role: expect.any(String),
          status: expect.any(String),
          registered: expect.any(Date),
          email: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          events: expect.any(Number),
        }),
      ]),
    });
  });
});
