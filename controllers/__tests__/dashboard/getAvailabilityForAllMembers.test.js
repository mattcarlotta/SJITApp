import { getAvailabilityForAllMembers } from "controllers/dashboard";

describe("Dashboard Get All Members Availability", () => {
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

  it("handles valid get member availability requests", async () => {
    const req = mockRequest();

    await getAvailabilityForAllMembers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      membersAvailability: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          availability: expect.any(Number),
        }),
      ]),
      months: expect.arrayContaining([expect.any(Date)]),
    });
  });
});
