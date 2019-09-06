import { Season } from "models";
import { createSeason } from "controllers/season";
import {
  seasonAlreadyExists,
  unableToCreateNewSeason,
} from "shared/authErrors";

const startDate = "2088-09-26T07:00:00.000+00:00";
const endDate = "2089-06-12T07:00:00.000+00:00";

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
      err: unableToCreateNewSeason,
    });
  });

  it("handles season already exists requests", async () => {
    const newSeason = {
      seasonId: "20002001",
      seasonDuration: [startDate, endDate],
    };

    const req = mockRequest(null, null, newSeason);

    await createSeason(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: seasonAlreadyExists,
    });
  });

  it("handles valid create season requests", async () => {
    const seasonId = "20882089";
    const newSeason = {
      seasonId,
      seasonDuration: [startDate, endDate],
    };

    const req = mockRequest(null, null, newSeason);

    await createSeason(req, res);
    const storedSeason = await Season.findOne({ seasonId: newSeason.seasonId });

    expect(storedSeason).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(ObjectId),
        members: expect.any(Array),
        seasonId,
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
