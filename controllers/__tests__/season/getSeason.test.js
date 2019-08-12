import { Season } from "models";
import { getSeason } from "controllers/season";
import { missingSeasonId, unableToLocateSeason } from "shared/authErrors";

describe("Get Season Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty params requests", async () => {
    const id = "";
    const req = mockRequest(null, null, null, null, { id });

    await getSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingSeasonId,
    });
  });

  it("handles invalid get season requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const req = mockRequest(null, null, null, null, { id });

    await getSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateSeason,
    });
  });

  it("handles valid get season requests", async () => {
    const seasonId = "20002001";
    const existingSeason = await Season.findOne({ seasonId });

    const req = mockRequest(null, null, null, null, { id: existingSeason._id });

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
