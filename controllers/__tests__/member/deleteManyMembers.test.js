import { User } from "models";
import { deleteManyMembers } from "controllers/member";
import { missingIds } from "shared/authErrors";

describe("Delete Many Members Controller", () => {
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

  it("handles empty param requests", async () => {
    const req = mockRequest(null, null, { ids: [] });

    await deleteManyMembers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingIds,
    });
  });

  it("handles valid delete member requests", async () => {
    const existingMember = await User.findOne({
      email: "deleted.employee@delete.com",
    });

    const req = mockRequest(null, null, {
      ids: [existingMember._id],
    });

    await deleteManyMembers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the members.",
    });
  });
});
