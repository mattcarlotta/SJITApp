import { Token, Season } from "models";
import { getAllTokens } from "controllers/token";
import { createSignupToken } from "shared/helpers";

describe("Get All Tokens Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles valid get all tokens requests", async () => {
    const newSeason = {
      seasonId: "20222023",
      startDate: new Date(2022, 9, 6),
      endDate: new Date(2023, 7, 6),
    };

    await Season.create(newSeason);

    const newHire1 = {
      authorizedEmail: "test88@example.com",
      role: "member",
      seasonId: newSeason.seasonId,
      token: createSignupToken(),
    };

    const newHire2 = {
      authorizedEmail: "test1884@example.com",
      role: "member",
      seasonId: newSeason.seasonId,
      token: createSignupToken(),
    };

    await Token.create(newHire1);
    await Token.create(newHire2);

    const res = mockResponse();
    const req = mockRequest();

    await getAllTokens(req, res);

    const allTokens = await Token.find({});

    expect(allTokens).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __v: expect.any(Number),
          _id: expect.any(ObjectId),
          authorizedEmail: expect.any(String),
          role: expect.any(String),
          seasonId: expect.any(String),
          token: expect.any(String),
        }),
      ]),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
