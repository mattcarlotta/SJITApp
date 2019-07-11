import { signin } from "controllers/auth";

const session = {
  user: {
    id: "88",
    email: "test@example.com",
    firstName: "Beta",
    lastName: "Tester",
    role: "member",
  },
};

describe("Signin User Controller", () => {
  it("handles valid sign in requests", () => {
    const res = mockResponse();
    const req = mockRequest(null, session);

    signin(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(session.user);
  });
});
