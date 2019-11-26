import { Token } from "models";
import { deleteManyTokens } from "controllers/token";
import { missingIds } from "shared/authErrors";

describe("Delete Many Tokens Controller", () => {
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

    await deleteManyTokens(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingIds,
    });
  });

  it("handles valid delete many token requests", async () => {
    const newToken = await Token.findOne({ email: "deleteme@delete.com" });

    const req = mockRequest(null, null, { ids: [newToken._id] });

    await deleteManyTokens(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the authorization keys.",
    });
  });
});
