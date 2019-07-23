import { Season } from "models";
import { deleteSeason } from "controllers/season";

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
      err: "You must provide a season id to delete.",
    });
  });

  it("handles invalid delete season requests", async () => {
    const id = "1234";
    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id });

    await deleteSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: "Unable to delete that season. It doesn't exist.",
    });
  });

  it("handles valid delete season requests", async () => {
    const existingSeason = await Season.findOne({ seasonId: "20112012" });

    const res = mockResponse();
    const req = mockRequest(null, null, null, null, {
      id: existingSeason.seasonId,
    });

    await deleteSeason(req, res);

    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the season.",
    });
  });
});
