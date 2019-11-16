import { User } from "models";
import { updateMemberSettings } from "controllers/member";
import {
  emailAlreadyTaken,
  missingMemberId,
  missingUpdateMemberParams,
  usernameAlreadyTaken,
} from "shared/authErrors";

const findExistingMember = email => User.findOne({ email });

describe("Update Member Settings Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  let existingMember;
  beforeAll(async () => {
    db = connectDatabase();
    existingMember = await findExistingMember("member399@example.com");
  });

  afterAll(async () => {
    await db.close();
  });

  it("handles invalid sessions requests", async () => {
    const session = {
      user: { id: "" },
    };

    const emptyBody = {
      _id: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "",
    };
    const req = mockRequest(null, session, emptyBody);

    await updateMemberSettings(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingMemberId,
    });
  });

  it("handles empty body requests", async () => {
    const session = {
      user: { id: existingMember._id },
    };

    const emptyBody = {
      _id: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "",
    };
    const req = mockRequest(null, session, emptyBody);

    await updateMemberSettings(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingUpdateMemberParams,
    });
  });

  it("handles email already in use requests", async () => {
    const session = {
      user: { id: existingMember._id },
    };

    const emptyBody = {
      _id: existingMember._id,
      email: "carlotta.matt@gmail.com",
      firstName: "Updated",
      lastName: "User",
      role: "employee",
    };
    const req = mockRequest(null, session, emptyBody);

    await updateMemberSettings(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: emailAlreadyTaken,
    });
  });

  it("handles invalid first and last name requests", async () => {
    const session = {
      user: { id: existingMember._id },
    };

    const invalidUsername = {
      _id: existingMember._id,
      email: "placedholdernewemail@test.com",
      firstName: "Matt",
      lastName: "Carlotta",
      role: "employee",
    };

    const req = mockRequest(null, session, invalidUsername);

    await updateMemberSettings(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: usernameAlreadyTaken,
    });
  });

  it("handles valid email update requests", async () => {
    const session = {
      user: { id: existingMember._id },
    };

    const updatedUser = {
      _id: existingMember._id,
      email: "placedholdernewemail@test.com",
      firstName: "Updated232",
      lastName: "User233",
      role: "employee",
    };
    const req = mockRequest(null, session, updatedUser);

    await updateMemberSettings(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "Your profile has been updated. Please re-log into your account with your new email address.",
    });
  });

  it("handles valid name update requests", async () => {
    const existingUser = await findExistingMember("member499@example.com");
    const session = {
      user: { id: existingUser._id },
    };

    const emptyBody = {
      _id: existingUser._id,
      email: existingUser.email,
      firstName: "Updated99948",
      lastName: "User478849",
      role: "employee",
    };
    const req = mockRequest(null, session, emptyBody);

    await updateMemberSettings(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated your settings.",
    });
  });
});
