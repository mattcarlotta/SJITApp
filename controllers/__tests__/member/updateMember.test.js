import { User } from "models";
import { updateMember } from "controllers/member";
import {
  emailAlreadyTaken,
  missingUpdateMemberParams,
  unableToLocateMember,
} from "shared/authErrors";

const findExistingMember = email => User.findOne({ email });

describe("Update Member Controller", () => {
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
      _id: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "",
    };
    const req = mockRequest(null, null, emptyBody);

    await updateMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingUpdateMemberParams,
    });
  });

  it("handles invalid id update member requests", async () => {
    const _id = "5d3b30c98b651c118b49938c";
    const invalidMember = {
      _id,
      email: "test@example.com",
      firstName: "Beta",
      lastName: "Tester",
      role: "employee",
    };
    const req = mockRequest(null, null, invalidMember);

    await updateMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateMember,
    });
  });

  it("handles invalid email update member requests", async () => {
    const existingMember = await findExistingMember("member9@example.com");

    const invalidMember = {
      _id: existingMember._id,
      email: "carlotta.matt@gmail.com",
      firstName: "Matt",
      lastName: "Carlotta",
      role: "employee",
    };

    let req = mockRequest(null, null, invalidMember);

    await updateMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: emailAlreadyTaken,
    });

    const validMember = {
      ...invalidMember,
      email: "member33@gmail.com",
    };

    req = mockRequest(null, null, validMember);

    await updateMember(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the member profile.",
    });
  });

  it("handles valid update member requests", async () => {
    const existingMember = await findExistingMember("member6@example.com");

    const changedMember = {
      _id: existingMember._id,
      email: "member6@example.com",
      firstName: "Updated",
      lastName: "Member",
      role: "staff",
    };

    const req = mockRequest(null, null, changedMember);

    await updateMember(req, res);

    const updatedMember = await User.findOne(
      { email: changedMember.email },
      {
        _id: 0, email: 1, firstName: 1, lastName: 1, role: 1,
      },
    ).lean();

    expect(updatedMember).toEqual({
      email: updatedMember.email,
      firstName: updatedMember.firstName,
      lastName: updatedMember.lastName,
      role: updatedMember.role,
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated the member profile.",
    });
  });
});
