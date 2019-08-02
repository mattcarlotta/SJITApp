import { signedin } from "controllers/auth";

const session = {
  user: {
    id: "88",
    email: "test@example.com",
    firstName: "Beta",
    lastName: "Tester",
    role: "employee",
  },
};

describe("Signedin User Controller", () => {
  it("handles valid session signin requests", () => {
    const res = mockResponse();
    const req = mockRequest(null, session);

    signedin(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(session.user);
  });
});
