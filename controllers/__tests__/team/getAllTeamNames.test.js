import { getAllTeamNames } from "controllers/team";

describe("Get All Team Names Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles valid get all team names requests", async () => {
    const res = mockResponse();
    const req = mockRequest();

    await getAllTeamNames(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      names: expect.any(Array),
    });
  });
});
