import { getAllMail } from "controllers/mail";

describe("Get All Mail Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles valid get all mail requests", async () => {
    const res = mockResponse();
    const req = mockRequest(null, null, null, { page: "1" });

    await getAllMail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      mail: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          message: expect.any(String),
          sendDate: expect.any(Date),
          sendFrom: expect.any(String),
          sendTo: expect.any(Array),
          status: expect.any(String),
          subject: expect.any(String),
        }),
      ]),
      totalDocs: expect.any(Number),
    });
  });
});
