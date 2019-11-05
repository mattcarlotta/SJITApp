import { User } from "models";
import { getScheduledEvents } from "controllers/event";

describe("Get Scheduled Events Controller", () => {
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

  it("handles valid get All Games requests", async () => {
    const query = {
      id: "",
      selectedDate: "2019-10-21T02:30:36.000+00:00",
      selectedGames: "",
    };
    const session = {
      user: {
        id: "0123456789",
      },
    };

    const req = mockRequest(null, session, null, query);

    await getScheduledEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      events: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(ObjectId),
          eventDate: expect.any(Date),
          eventType: expect.any(String),
          location: expect.any(String),
          notes: expect.any(String),
          opponent: expect.any(String),
          team: expect.any(String),
          uniform: expect.any(String),
        }),
      ]),
    });
  });

  it("handles valid get My Games requests", async () => {
    const admin = await User.findOne({ role: "admin" });

    const query = {
      id: "",
      selectedDate: "2019-10-21T02:30:36.000+00:00",
      selectedGames: "My Games",
    };

    const session = {
      user: {
        id: admin._id.toString(),
      },
    };

    const req = mockRequest(null, session, null, query);

    await getScheduledEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      events: [],
    });
  });

  it("handles valid get scheduled games by id for profile viewing requests", async () => {
    const staff = await User.findOne({ role: "staff" });

    const query = {
      id: staff._id.toString(),
      selectedDate: "2019-10-21T02:30:36.000+00:00",
      selectedGames: "My Games",
    };

    const session = {
      user: {
        id: "0123456789",
      },
    };

    const req = mockRequest(null, session, null, query);

    await getScheduledEvents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      events: [],
    });
  });
});
