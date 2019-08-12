import { updatePassword } from "controllers/auth";
import { passwordResetSuccess } from "shared/authSuccess";

const updateUserPassword = {
  email: "test@example.com",
};

describe("Update Password Controller", () => {
  it("handles valid update password requests", () => {
    const res = mockResponse();
    const req = mockRequest(updateUserPassword);

    updatePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: passwordResetSuccess(req.user),
    });
  });
});
