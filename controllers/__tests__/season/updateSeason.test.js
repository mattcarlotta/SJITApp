import { Season } from "models";
import { updateSeason } from "controllers/season";

describe("Update Season Controller", () => {
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
      startDate: "",
      endDate: "",
    };

    const res = mockResponse();
    const req = mockRequest(null, null, emptyBody);

    await updateSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err:
        "Unable to update the existing season. You must provide a model id, seasonId, startDate, and endDate.",
    });
  });

  it("handles invalid ids requests", async () => {
    const invalidId = {
      _id: "5d36409b0aa1b50ba8f926dc",
      seasonId: "20052006",
      startDate: "date",
      endDate: "date",
    };

    const res = mockResponse();
    const req = mockRequest(null, null, invalidId);

    await updateSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: `Unable to locate the season: ${invalidId.seasonId}.`,
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
      startDate: newStartDate,
      endDate: newEndDate,
    };

    const res = mockResponse();
    const req = mockRequest(null, null, validRequest);

    await updateSeason(req, res);

    existingSeason = await Season.findOne({ seasonId: newSeasonId });

    expect(existingSeason).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: existingSeason._id,
        members: expect.any(Array),
        seasonId: newSeasonId,
        startDate: newStartDate,
        endDate: newEndDate,
      }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the season.",
    });
  });
});
