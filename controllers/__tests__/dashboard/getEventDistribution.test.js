import moment from "moment-timezone";
import { getEventDistribution } from "controllers/dashboard";
import { missingDates } from "shared/authErrors";

describe("Get Dashboard Events Distribution Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  beforeAll(async () => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty query requests", async () => {
    const startDate = "";
    const endDate = "";
    const req = mockRequest(null, null, null, { startDate, endDate });

    await getEventDistribution(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingDates,
    });
  });

  it("handles empty event counts", async () => {
    const startDate = "1989-08-01T17:45:26-07:00";
    const endDate = "1989-08-31T17:45:26-07:00";

    const req = mockRequest(null, null, null, { startDate, endDate });

    await getEventDistribution(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      members: [],
    });
  });

  it("handles valid get today's events requests", async () => {
    const startDate = moment()
      .startOf("month")
      .format();
    const endDate = moment()
      .endOf("month")
      .format();

    const req = mockRequest(null, null, null, { startDate, endDate });

    await getEventDistribution(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      members: expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          "Event Count": expect.any(Number),
        }),
      ]),
    });
  });
});
