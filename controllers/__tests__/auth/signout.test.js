import { signout } from "controllers/auth";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

const destroy = jest.fn();

const session = {
  destroy,
  user: {
    id: "88",
    email: "test@example.com",
    firstName: "Beta",
    lastName: "Tester",
    role: "member",
  },
};

describe("Signout User Controller", () => {
  it("handles valid sign out requests", () => {
    const res = mockResponse();
    const req = mockRequest(null, session);

    signout(req, res);

    expect(destroy).toHaveBeenCalledTimes(1);
    expect(res.clearCookie).toHaveBeenCalledWith("SJSITApp", { path: "/" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Session ended.");
  });
});
