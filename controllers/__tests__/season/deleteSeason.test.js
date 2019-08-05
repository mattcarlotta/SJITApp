import { Season } from "models";
import { deleteSeason } from "controllers/season";
import { missingSeasonId, unableToDeleteSeason } from "shared/authErrors";

describe("Delete Season Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty param requests", async () => {
    const id = "";
    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id });

    await deleteSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingSeasonId,
    });
  });

  it("handles invalid delete season requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id });

    await deleteSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToDeleteSeason,
    });
  });

  it("handles valid delete season requests", async () => {
    const existingSeason = await Season.findOne({ seasonId: "20112012" });

    const res = mockResponse();
    const req = mockRequest(null, null, null, null, {
      id: existingSeason._id,
    });

    await deleteSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the season.",
    });
  });
});
