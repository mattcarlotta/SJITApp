import { Team } from "models";
import { createTeam } from "controllers/team";
import { createUniqueName } from "shared/helpers";
import { teamAlreadyExists, unableToCreateTeam } from "shared/authErrors";

describe("Create Team Controller", () => {
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
    const emptyBody = {
      league: "",
      team: "",
    };

    const req = mockRequest(null, null, emptyBody);

    await createTeam(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToCreateTeam,
    });
  });

  it("handles team already exists requests", async () => {
    const newTeam = {
      league: "NHL",
      team: "San Jose Sharks",
    };

    const req = mockRequest(null, null, newTeam);

    await createTeam(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: teamAlreadyExists,
    });
  });

  it("handles valid create team requests", async () => {
    const team = "Carlotta Corps";
    const name = createUniqueName(team);
    const league = "nhl";

    const newTeam = {
      league,
      team,
    };

    const req = mockRequest(null, null, newTeam);

    await createTeam(req, res);

    const createdTeam = await Team.findOne({ team });

    expect(createdTeam).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(ObjectId),
        team,
        name,
        league: newTeam.league,
      }),
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `Successfully added the ${team} to the ${league}.`,
    });
  });
});
