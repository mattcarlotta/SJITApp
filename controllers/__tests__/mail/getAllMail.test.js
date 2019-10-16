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
    const req = mockRequest();

    await getAllMail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      mail: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          sendTo: expect.any(Array),
          sendDate: expect.any(Date),
          status: expect.any(String),
          sendFrom: expect.any(String),
          subject: expect.any(String),
          message: expect.any(String),
        }),
      ]),
    });
  });
});
