import { getAllSeasons } from "controllers/season";

describe("Get All Seasons Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles valid get all seasons requests", async () => {
    const req = mockRequest(null, null, null, {});
    const res = mockResponse();

    await getAllSeasons(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      seasons: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          endDate: expect.any(Date),
          seasonId: expect.any(String),
          startDate: expect.any(Date),
        }),
      ]),
      totalDocs: expect.any(Number),
    });
  });
});
