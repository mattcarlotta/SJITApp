import { getAllSeasonIds } from "controllers/season";

describe("Get All Seasons Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles valid get all season ids requests", async () => {
    const res = mockResponse();
    const req = mockRequest();

    await getAllSeasonIds(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      seasonIds: expect.any(Array),
    });
  });
});
