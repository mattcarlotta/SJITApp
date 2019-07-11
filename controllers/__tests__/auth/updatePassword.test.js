import { updatePassword } from "controllers/auth";
import { passwordResetSuccess } from "shared/authSuccess";
import { mockRequest, mockResponse } from "../../__mocks__/controllers.mocks";

const updateUserPassword = {
  email: "test@example.com",
};

describe("Update Password Controller", () => {
  it("handles valid update password requests", () => {
    const res = mockResponse();
    const req = mockRequest(updateUserPassword);

    updatePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: passwordResetSuccess(req.user),
    });
  });
});
