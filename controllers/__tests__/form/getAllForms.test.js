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
    const req = mockRequest(null, null, null, { page: "1" });

    await getAllForms(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      forms: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          endMonth: expect.any(Date),
          expirationDate: expect.any(Date),
          seasonId: expect.any(String),
          sendEmailNotificationsDate: expect.any(Date),
          sentEmails: expect.any(Boolean),
          startMonth: expect.any(Date),
        }),
      ]),
      totalDocs: expect.any(Number),
    });
  });
});
