import { Event, Form, Season } from "models";
import { deleteManySeasons } from "controllers/season";
import { missingIds, unableToDeleteSeasons } from "shared/authErrors";

describe("Delete Many Seasons Controller", () => {
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
    const req = mockRequest(null, null, { ids: [] });

    await deleteManySeasons(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingIds,
    });
  });

  it("handles invalid delete many seasons requests", async () => {
    const req = mockRequest(null, null, { ids: ["5d36409b0aa1b50ba8f926dc"] });

    await deleteManySeasons(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToDeleteSeasons,
    });
  });

  it("handles valid delete many seasons requests", async () => {
    const existingSeason = await Season.findOne({ seasonId: "19801981" });

    let existingEvent = await Event.findOne({ notes: "Auto deleted event." });
    let existingForm = await Form.findOne({ notes: "Auto deleted form." });

    expect(existingEvent).toBeDefined();
    expect(existingForm).toBeDefined();

    const req = mockRequest(null, null, {
      ids: [existingSeason._id],
    });

    await deleteManySeasons(req, res);

    existingEvent = await Event.findOne({ notes: "Auto deleted event." });
    existingForm = await Form.findOne({ notes: "Auto deleted form." });

    expect(existingEvent).toBeNull();
    expect(existingForm).toBeNull();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the seasons.",
    });
  });
});
