import { getSeason } from "controllers/season";

describe("Get Season Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty params requests", async () => {
    const id = "";
    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id });

    await getSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: "You must include a seasonId.",
    });
  });

  it("handles invalid get season requests", async () => {
    const id = "1234";
    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id });

    await getSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: `Unable to locate the season: ${id}.`,
    });
  });

  it("handles valid get season requests", async () => {
    const id = "20002001";
    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id });

    await getSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      season: expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(ObjectId),
        seasonId: expect.any(String),
        startDate: expect.any(Date),
        endDate: expect.any(Date),
      }),
    });
  });
});
