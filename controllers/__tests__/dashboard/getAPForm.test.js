import { getAPForm } from "controllers/dashboard";

describe("Dashboard Get AP Form", () => {
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

  // it("handles no A/P form requests", async () => {
  //   const req = mockRequest();
  //
  //   await getAPForm(req, res);
  //
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith({
  //     apform: {},
  //   });
  // });

  it("handles valid get A/P form requests", async () => {
    const req = mockRequest();

    await getAPForm(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      apform: expect.objectContaining({
        _id: expect.any(ObjectId),
        endMonth: expect.any(Date),
        eventCounts: expect.any(Number),
        expirationDate: expect.any(Date),
        startMonth: expect.any(Date),
      }),
    });
  });
});
