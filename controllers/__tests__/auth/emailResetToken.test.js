import { emailResetToken } from "controllers/auth";
import { passwordResetToken } from "shared/authSuccess";

const newUser = {
  email: "test@example.com",
};

describe("Email Reset Token Controller", () => {
  it("handles valid password reset requests", () => {
    const res = mockResponse();
    const req = mockRequest(newUser);

    emailResetToken(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(passwordResetToken(req.user));
  });
});
