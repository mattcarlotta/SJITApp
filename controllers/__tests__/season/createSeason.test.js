import { Season } from "models";
import { createSeason } from "controllers/season";

describe("Create Season Controller", () => {
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

  it("handles empty body requests", async () => {
    const emptyBody = {
      seasonId: "",
      startDate: "",
      endDate: "",
    };

    const req = mockRequest(null, null, emptyBody);

    await createSeason(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err:
        "Unable to create a new season. You must provide seasonId, startDate, and endDate fields.",
    });
  });

  it("handles invalid body requests", async () => {
    const emptyBody = {
      seasonId: { hello: 2001 },
      startDate: 88,
      endDate: 99,
    };

    const req = mockRequest(null, null, emptyBody);

    await createSeason(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: expect.stringContaining("CastError"),
    });
  });

  it("handles season already exists requests", async () => {
    const newSeason = {
      seasonId: "20002001",
      startDate: new Date(2000, 9, 6),
      endDate: new Date(2001, 7, 6),
    };

    const req = mockRequest(null, null, newSeason);

    await createSeason(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err:
        "That season already exists. Please edit the current season or choose different start and end dates.",
    });
  });

  it("handles valid create season requests", async () => {
    const newSeason = {
      seasonId: "20192020",
      startDate: new Date(2019, 9, 6),
      endDate: new Date(2020, 7, 6),
    };

    const req = mockRequest(null, null, newSeason);

    await createSeason(req, res);
    const storedSeason = await Season.findOne({ seasonId: newSeason.seasonId });

    expect(storedSeason).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(ObjectId),
        members: expect.any(Array),
        seasonId: expect.any(String),
        startDate: expect.any(Date),
        endDate: expect.any(Date),
      }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully created a new season!",
    });
  });
});