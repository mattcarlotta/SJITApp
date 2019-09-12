import { Season } from "models";
import { updateSeason } from "controllers/season";
import {
  seasonAlreadyExists,
  unableToLocateSeason,
  unableToUpdateSeason,
} from "shared/authErrors";

describe("Update Season Controller", () => {
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
      _id: "",
      seasonId: "",
      seasonDuration: "",
    };

    const req = mockRequest(null, null, emptyBody);

    await updateSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToUpdateSeason,
    });
  });

  it("handles invalid ids requests", async () => {
    const invalidId = {
      _id: "5d44a68188524202892bd82d",
      seasonId: "20052006",
      seasonDuration: [
        "2005-09-26T07:00:00.000+00:00",
        "2006-06-12T07:00:00.000+00:00",
      ],
    };

    const req = mockRequest(null, null, invalidId);

    await updateSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateSeason,
    });
  });

  it("handles season in use requests", async () => {
    const seasonId = "20462047";
    const newStartDate = new Date(2046, 8, 26);
    const newEndDate = new Date(2047, 5, 12);

    const newSeason = await Season.create({
      seasonId,
      startDate: newStartDate,
      endDate: newEndDate,
    });

    const invalidSeasonId = {
      _id: newSeason._id,
      seasonId: "20002001",
      seasonDuration: [
        "2000-09-26T07:00:00.000+00:00",
        "2001-06-12T07:00:00.000+00:00",
      ],
    };

    const req = mockRequest(null, null, invalidSeasonId);

    await updateSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: seasonAlreadyExists,
    });
  });

  it("handles valid update requests", async () => {
    const newSeasonId = "20062007";
    const newStartDate = new Date(2006, 8, 26);
    const newEndDate = new Date(2007, 5, 12);

    let existingSeason = await Season.findOne({ seasonId: "20052006" });

    const validRequest = {
      _id: existingSeason._id,
      seasonId: newSeasonId,
      seasonDuration: [newStartDate, newEndDate],
    };

    let req = mockRequest(null, null, validRequest);

    await updateSeason(req, res);

    existingSeason = await Season.findOne({ seasonId: newSeasonId });

    expect(existingSeason).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: existingSeason._id,
        seasonId: newSeasonId,
        startDate: newStartDate,
        endDate: newEndDate,
      }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the season.",
    });

    const updateStartDate = new Date(2026, 8, 26);
    const upateEndDate = new Date(2027, 5, 12);

    const updateSeasonDates = {
      _id: existingSeason._id,
      seasonId: existingSeason.seasonId,
      seasonDuration: [updateStartDate, upateEndDate],
    };

    req = mockRequest(null, null, updateSeasonDates);

    await updateSeason(req, res);

    existingSeason = await Season.findOne({
      seasonId: existingSeason.seasonId,
    });

    expect(existingSeason).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: existingSeason._id,
        seasonId: newSeasonId,
        startDate: updateStartDate,
        endDate: upateEndDate,
      }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the season.",
    });
  });
});
