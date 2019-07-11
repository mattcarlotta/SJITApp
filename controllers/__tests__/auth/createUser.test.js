import { createUser } from "controllers/auth";
import { thanksForReg } from "shared/authSuccess";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

const newUser = {
  email: "test@example.com",
  firstName: "Beta",
  lastName: "Tester",
};

describe("Create User Controller", () => {
  it("handles valid sign up requests", () => {
    const res = mockResponse();
    const req = mockRequest(newUser);

    createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      thanksForReg(req.user.email, req.user.firstName, req.user.lastName),
    );
  });
});
