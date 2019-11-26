import { Event } from "models";
import { deleteManyEvents } from "controllers/event";
import { missingIds } from "shared/authErrors";

describe("Delete Many Events Controller", () => {
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
    const ids = [];
    const req = mockRequest(null, null, { ids });

    await deleteManyEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingIds,
    });
  });

  it("handles valid delete many events requests", async () => {
    const existingEvent = await Event.findOne({ notes: "Delete this game." });

    const req = mockRequest(null, null, { ids: [existingEvent._id] });

    await deleteManyEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the events.",
    });
  });
});
