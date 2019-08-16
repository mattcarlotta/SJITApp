import { getAllForms } from "controllers/form";

describe("Get All Forms Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles valid get all forms requests", async () => {
    const res = mockResponse();
    const req = mockRequest();

    await getAllForms(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      forms: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          expirationDate: expect.any(Date),
          startMonth: expect.any(Date),
          endMonth: expect.any(Date),
          notes: expect.any(String),
          seasonId: expect.any(String),
        }),
      ]),
    });
  });
});
