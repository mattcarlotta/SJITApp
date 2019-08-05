import { User } from "models";
import { deleteMember } from "controllers/member";
import { missingMemberId, unableToDeleteMember } from "shared/authErrors";

describe("Delete Member Controller", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles empty param requests", async () => {
    const id = "";
    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id });

    await deleteMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMemberId,
    });
  });

  it("handles invalid delete member requests", async () => {
    const id = "5d36409b0aa1b50ba8f926dc";
    const res = mockResponse();
    const req = mockRequest(null, null, null, null, { id });

    await deleteMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToDeleteMember,
    });
  });

  it("handles valid delete member requests", async () => {
    const existingMember = await User.findOne({ email: "member5@example.com" });

    const res = mockResponse();
    const req = mockRequest(null, null, null, null, {
      id: existingMember._id,
    });

    await deleteMember(req, res);

    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully deleted the member.",
    });
  });
});
