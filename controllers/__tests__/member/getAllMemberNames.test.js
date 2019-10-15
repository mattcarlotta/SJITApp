import { getAllMemberNames } from "controllers/member";

describe("Get All Members Names Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles valid get all members names requests", async () => {
    const res = mockResponse();
    const req = mockRequest();

    await getAllMemberNames(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      members: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          email: expect.any(String),
        }),
      ]),
    });
  });
});
